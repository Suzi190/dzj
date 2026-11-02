// 从打包产物中提取静态资源路径 / 接口地址 / 动态 chunk 引用
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'site-mirror');
const files = ['assets/index-WFSmNqA8.js', 'assets/index-D5frml_S.css', 'index.html', 'manifest.json'];

const decodeEscapes = (s) => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));

const assetRe = /["'`(]\s*(\/[^"'`()\s]{1,300}?\.(?:png|jpe?g|webp|gif|svg|ico|bmp|avif|woff2?|ttf|otf|eot|mp3|wav|ogg|m4a|mp4|webm|json|xml))\s*["'`)]/g;
const assetNoSlashRe = /["'`]\s*((?:moods|assets|images?|img|fonts?|icons?|static|media)\/[^"'`()\s]{1,300}?\.(?:png|jpe?g|webp|gif|svg|ico|bmp|avif|woff2?|ttf|otf|eot|mp3|wav|ogg|m4a|mp4|webm|json))\s*["'`]/g;
const urlRe = /https?:\/\/[^\s"'`)<>\\)]{4,200}/g;
const dyncImportRe = /["'`]\.?\/?(assets\/[^"'`]+\.js)["'`]/g;

const assets = new Set();
const externals = new Set();
const chunks = new Set();

for (const rel of files) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) continue;
  const raw = fs.readFileSync(p, 'utf8');
  const text = decodeEscapes(raw) + '\n' + raw;
  for (const re of [assetRe, assetNoSlashRe]) {
    let m;
    while ((m = re.exec(text))) assets.add(m[1]);
  }
  let m;
  while ((m = urlRe.exec(text))) externals.add(m[0].replace(/[,;]$/, ''));
  while ((m = dyncImportRe.exec(text))) chunks.add(m[1]);
}

const guessBackend = [...externals].filter((u) =>
  /(supabase|firebase|cloudinary|googleapis|amazonaws|aliyuncs|myqcloud|vercel\.app|upstash|redis|mongo|gitee|api\.)/i.test(u)
);

const out = path.join(__dirname, 'assets-report.json');
fs.writeFileSync(
  out,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      localAssets: [...assets].sort(),
      dynamicChunks: [...chunks].sort(),
      externalUrls: [...externals].sort(),
      likelyBackend: guessBackend.sort(),
    },
    null,
    2
  )
);

console.log('local assets :', assets.size);
console.log('dyn chunks   :', chunks.size);
console.log('external urls:', externals.size);
console.log('likely backend:', guessBackend.length);
console.log('report ->', out);
console.log('\n--- local assets ---');
console.log([...assets].sort().join('\n'));
