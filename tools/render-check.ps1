# 本地镜像渲染自检：起服务 -> 无头 Edge 抓 DOM -> 提取可见文本
# 用法： powershell -ExecutionPolicy Bypass -File tools\render-check.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$edge = @(
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $edge) { throw '未找到 Edge / Chrome，无法执行渲染自检' }

$port = 5199
$srv = Start-Process -FilePath 'node' -ArgumentList 'server.js', $port -WorkingDirectory $root -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 2

$dom = Join-Path $env:TEMP 'douzhi-render-check.html'
$edgeErr = Join-Path $env:TEMP 'douzhi-render-check.err.log'
$profile = Join-Path $env:TEMP ('edge-douzhi-' + [guid]::NewGuid().ToString('N'))
try {
  # 用 -RedirectStandardOutput 直接落盘，避免 PowerShell 管道按控制台代码页解码导致中文乱码
  Start-Process -FilePath $edge -ArgumentList @(
    '--headless=new', '--disable-gpu', '--no-sandbox',
    "--user-data-dir=$profile",
    '--virtual-time-budget=12000',
    '--dump-dom', "http://localhost:$port/"
  ) -RedirectStandardOutput $dom -RedirectStandardError $edgeErr -NoNewWindow -Wait
} finally {
  Stop-Process -Id $srv.Id -Force -ErrorAction SilentlyContinue
  Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like "*$profile*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  Remove-Item -LiteralPath $profile -Recurse -Force -ErrorAction SilentlyContinue
}

$html = [IO.File]::ReadAllText($dom, [Text.Encoding]::UTF8)
$idx = $html.IndexOf('<div id="root"')
if ($idx -lt 0) { throw 'DOM 里没有 #root，SPA 未渲染' }

$body = $html.Substring($idx)
$body = [regex]::Replace($body, '<script[\s\S]*?</script>', ' ')
$text = [regex]::Replace($body, '<[^>]+>', ' ')
$text = [regex]::Replace($text, '\s+', ' ').Trim()

Write-Host "DOM 大小: $($html.Length) 字节"
Write-Host "可见文本:"
Write-Host $text
