#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "app", "HomeClient.tsx");
let s = fs.readFileSync(filePath, "utf8");

const broken = `                          </video>),
              )}
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>`;

const fixed = `                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>),
              )}
            </div>`;

const count = s.split(broken).length - 1;
s = s.split(broken).join(fixed);

fs.writeFileSync(filePath, s);
console.log(`Fixed ${count} toggle sections.`);
