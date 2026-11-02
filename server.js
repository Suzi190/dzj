/**
 * 本地静态服务器：把 site-mirror/ 当作 www.douzhi.me 的根目录
 * - 支持中文文件名（URL 解码）
 * - 找不到文件时回退到 index.html（模拟 Vercel / SPA 的 catch-all 行为）
 *
 * 用法： node server.js [端口]
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = path.join(__dirname, 'site-mirror');
const PORT = Number(process.argv[2] || process.env.PORT || 5173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
};

function send(res, status, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  };
  if (ext === '.html') {
    headers['Cross-Origin-Opener-Policy'] = 'same-origin';
    headers['Cross-Origin-Embedder-Policy'] = 'credentialless';
  }
  res.writeHead(status, headers);
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  let pathname = '/';
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    pathname = '/';
  }

  // 防止路径穿越
  const safeRel = path.normalize(pathname).replace(/^([/\\])+/, '');
  const target = path.join(ROOT, safeRel);
  if (!target.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(target, (err, stat) => {
    if (!err && stat.isFile()) {
      send(res, 200, target);
      return;
    }
    // SPA 回退
    send(res, 200, path.join(ROOT, 'index.html'));
  });
});

server.listen(PORT, () => {
  console.log(`豆汁静态镜像已启动: http://localhost:${PORT}/`);
  console.log(`根目录: ${ROOT}`);
});
