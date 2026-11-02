const fs=require("fs");
const js=fs.readFileSync("src-readable/index.pretty.js","utf8").split(/\r?\n/);
const all=new Set();
js.forEach(l=>{const m=l.match(/path:\s*"(\/[^"\\]{0,80})"/); if(m) all.add(m[1]);});
const md=fs.readFileSync("docs/routes.md","utf8");
const missing=[...all].filter(p=>!md.includes("| `"+p+"` |"));
console.log("bundle paths:",all.size,"missing in doc:",missing.length);
console.log(missing.join("\n"));
