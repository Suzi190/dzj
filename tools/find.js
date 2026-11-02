/**
 * 在美化后的产物里检索（带行号 + 上下文）
 *
 * 用法：
 *   node tools/find.js "关键字"             # 默认上下文 0 行
 *   node tools/find.js "chat/completions" 3 # 前后各 3 行
 *   node tools/find.js "path: \"/wallet\"" 2 --file=src-readable/index.pretty.css
 *   node tools/find.js "/^\s*function\s+\w+\(/" --regex
 *
 * 可选：--file=路径（相对项目根目录）、--max=命中上限（默认 50）
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);

const opts = {
  needle: '',
  ctx: 0,
  file: path.join(root, 'src-readable', 'index.pretty.js'),
  regex: false,
  max: 50,
};

argv.forEach((a, i) => {
  if (a.startsWith('--file=')) opts.file = path.resolve(root, a.slice(7));
  else if (a.startsWith('--max=')) opts.max = Number(a.slice(6));
  else if (a === '--regex') opts.regex = true;
  else if (i === 0) opts.needle = a;
  else if (!Number.isNaN(Number(a)) && a !== '') opts.ctx = Number(a);
});

if (!opts.needle) {
  console.log('用法: node tools/find.js "关键字" [上下文行数] [--regex] [--file=...] [--max=50]');
  process.exit(1);
}

const text = fs.readFileSync(opts.file, 'utf8');
const lines = text.split(/\r?\n/);
const matcher = opts.regex
  ? new RegExp(opts.needle)
  : { test: (s) => s.toLowerCase().includes(opts.needle.toLowerCase()) };

let hits = 0;
const printed = new Set();

for (let i = 0; i < lines.length && hits < opts.max; i++) {
  if (!matcher.test(lines[i])) continue;
  hits++;
  const from = Math.max(0, i - opts.ctx);
  const to = Math.min(lines.length - 1, i + opts.ctx);
  for (let j = from; j <= to; j++) {
    if (printed.has(j)) continue;
    printed.add(j);
    const mark = j === i ? '>' : ' ';
    console.log(`${mark}${String(j + 1).padStart(7)} | ${lines[j]}`);
  }
  if (opts.ctx > 0) console.log('  ...');
}

console.log(`\n共 ${hits} 处命中${hits >= opts.max ? `（已截断，使用 --max 调大上限）` : ''}，文件: ${path.relative(root, opts.file)}`);
