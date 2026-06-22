import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-100 bg-white flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-10 md:py-16 gap-6">
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="text-lg font-bold text-zinc-900 headline-font">
          <span className="text-[#1F3A89]">DataLynk</span>r
        </div>
        <div className="flex items-center gap-1.5 font-['Wix_Madefor_Text'] text-xs text-zinc-400">
          <span>©</span>
          <span className="font-bold">
            <span style={{ color: "#e46b0c" }}>IT</span>{" "}
            <span style={{ color: "black" }}>Catalyst</span>
          </span>
          <span>Software India Pvt Ltd. 2026.</span>
        </div>
      </div>
      <div className="flex gap-8">
        <Link
          className="text-zinc-400 font-['Wix_Madefor_Text'] text-xs hover:text-[#1F3A89] transition-colors"
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </Link>
        <Link
          className="text-zinc-400 font-['Wix_Madefor_Text'] text-xs hover:text-[#1F3A89] transition-colors"
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </Link>
        <Link
          className="text-zinc-400 font-['Wix_Madefor_Text'] text-xs hover:text-[#1F3A89] transition-colors"
          href="/support"
        >
          Support
        </Link>
      </div>
    </footer>
  );
}
