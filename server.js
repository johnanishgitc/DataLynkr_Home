const fs = require("fs");
const path = require("path");

const PRODUCTION_BASE_PATH = "/Hometest";

const STATIC_MIME = {
  ".js": "application/javascript; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".map": "application/json",
};

function logErrorAndExit(err) {
  console.error("Uncaught exception/rejection:", err);
  const logPath = path.join(__dirname, "startup-error.log");
  const errorDetails = `[${new Date().toISOString()}] Uncaught Exception/Rejection:\n${err.stack || err}\n\n`;
  try {
    fs.appendFileSync(logPath, errorDetails, "utf8");
  } catch (writeErr) {
    console.error("Failed to write to startup-error.log:", writeErr);
  }
  process.exit(1);
}

process.on("uncaughtException", logErrorAndExit);
process.on("unhandledRejection", logErrorAndExit);

/** Replace Windows build-machine paths baked into .next config with this server directory. */
function patchBuildPaths() {
  try {
    const normalizedDirname = __dirname.replace(/\\/g, "/");
    const files = [
      path.join(__dirname, ".next", "required-server-files.json"),
      path.join(__dirname, ".next", "required-server-files.js"),
    ];

    for (const filePath of files) {
      if (!fs.existsSync(filePath)) continue;

      let content = fs.readFileSync(filePath, "utf8");
      const patched = content.replace(
        /[A-Za-z]:[\\\/][^"\\]+(?:datalynkr-next|DataLynkr[^"\\]*)/gi,
        normalizedDirname
      );

      if (patched !== content) {
        fs.writeFileSync(filePath, patched, "utf8");
        appendStartupLog(`Patched ${path.basename(filePath)} to path: ${normalizedDirname}`);
      }
    }
  } catch (err) {
    console.error("Failed to dynamically patch build files:", err);
  }
}

function appendStartupLog(message) {
  const logPath = path.join(__dirname, "startup-error.log");
  try {
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`, "utf8");
  } catch {
    // ignore
  }
}

function normalizePathname(urlPath) {
  if (!urlPath) return "/";
  let pathname = urlPath.split("?")[0];
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // keep raw pathname when decoding fails
  }
  if (
    process.env.NODE_ENV === "production" &&
    PRODUCTION_BASE_PATH &&
    pathname.startsWith(PRODUCTION_BASE_PATH)
  ) {
    return pathname.slice(PRODUCTION_BASE_PATH.length) || "/";
  }
  return pathname;
}

/** Serve /_next/static/* from .next/static on disk — avoids 500s when Next handler misses a chunk. */
function tryServeNextStatic(req, res) {
  const pathname = normalizePathname(req.url);
  if (!pathname.startsWith("/_next/static/")) return false;

  const relativeFile = pathname.replace("/_next/", "");
  const staticRoot = path.join(__dirname, ".next");
  const diskPath = path.resolve(staticRoot, relativeFile);

  if (!diskPath.startsWith(staticRoot + path.sep)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return true;
  }

  if (!fs.existsSync(diskPath) || !fs.statSync(diskPath).isFile()) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.end("Not Found");
    return true;
  }

  const ext = path.extname(diskPath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("Content-Type", STATIC_MIME[ext] || "application/octet-stream");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  fs.createReadStream(diskPath).pipe(res);
  return true;
}

patchBuildPaths();

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = process.env.PORT || 3200;
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        if (tryServeNextStatic(req, res)) return;

        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Request handling error:", err);
        appendStartupLog(`Request Error (${req.url}):\n${err.stack || err}`);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      }
    }).listen(port, () => {
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start application:", err);
    appendStartupLog(`Next.js App Prepare Error:\n${err.stack || err}`);
    throw err;
  });
