# 網站部署指南

## 🌐 線上預覽

您的網站已成功建置完成！可透過以下方式訪問：

### 臨時預覽連結
https://8080-i3io1a3wchoyx9ll7oy1j-e2855631.sg1.manus.computer

## 📦 部署選項

### 選項一：GitHub Pages（推薦 - 免費 & 自動更新）

#### 步驟 1：建立 GitHub 倉庫
1. 登入 GitHub 帳號
2. 建立新倉庫，命名為 `dean-lin-website` 或 `deanlin.github.io`
3. 設定為公開 (Public)

#### 步驟 2：上傳檔案
```bash
cd /home/ubuntu/dean-lin-website
git init
git add .
git commit -m "Initial commit: Dean Lin personal website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dean-lin-website.git
git push -u origin main
```

#### 步驟 3：啟用 GitHub Pages
1. 進入倉庫設定 (Settings)
2. 找到 "Pages" 選項
3. 選擇 "Deploy from a branch"
4. 選擇 "main" 分支
5. 點擊 "Save"

您的網站將在 `https://YOUR_USERNAME.github.io/dean-lin-website` 上線

---

### 選項二：Netlify（推薦 - 功能豐富）

#### 步驟 1：連接 GitHub
1. 登入 Netlify (https://www.netlify.com)
2. 點擊 "New site from Git"
3. 選擇 GitHub
4. 授權並選擇 `dean-lin-website` 倉庫

#### 步驟 2：設定部署
- Build command：留空（純前端無需編譯）
- Publish directory：`.`（根目錄）
- 點擊 "Deploy site"

您的網站將自動部署，並獲得一個 Netlify 域名

#### 步驟 3：自訂域名（可選）
1. 進入 Site settings
2. 選擇 "Domain management"
3. 新增自訂域名
4. 按照指示設定 DNS

---

### 選項三：Vercel（推薦 - 極速部署）

#### 步驟 1：連接 GitHub
1. 登入 Vercel (https://vercel.com)
2. 點擊 "New Project"
3. 選擇 GitHub 倉庫

#### 步驟 2：部署
- 框架選擇：Other
- 點擊 "Deploy"

您的網站將在 Vercel 上線

---

### 選項四：傳統虛擬主機

#### 使用 FTP 上傳
1. 使用 FTP 客戶端（如 FileZilla）
2. 連接到您的虛擬主機
3. 上傳整個 `dean-lin-website` 資料夾
4. 確保 `index.html` 在根目錄或指定的 Web 目錄

#### 使用 cPanel
1. 登入 cPanel
2. 進入 "File Manager"
3. 上傳所有檔案到 `public_html` 目錄
4. 確保檔案權限正確 (644 for files, 755 for directories)

---

### 選項五：AWS S3 + CloudFront

#### 步驟 1：建立 S3 Bucket
```bash
aws s3 mb s3://dean-lin-website --region us-east-1
```

#### 步驟 2：啟用靜態網站託管
```bash
aws s3 website s3://dean-lin-website \
    --index-document index.html \
    --error-document index.html
```

#### 步驟 3：上傳檔案
```bash
aws s3 sync /home/ubuntu/dean-lin-website s3://dean-lin-website --delete
```

#### 步驟 4：設定 CloudFront（可選）
1. 建立 CloudFront 分佈
2. 指向 S3 bucket
3. 設定自訂域名

---

## 🔧 部署前檢查清單

- [ ] 所有圖片都正確放在 `images/` 資料夾
- [ ] HTML 中的圖片路徑正確（使用相對路徑）
- [ ] 所有外部連結都有效
- [ ] 聯繫方式已更新（Email、Facebook 等）
- [ ] 在不同瀏覽器測試過（Chrome, Firefox, Safari, Edge）
- [ ] 在行動裝置上測試過響應式設計
- [ ] 頁面載入速度可接受
- [ ] 沒有控制台錯誤

---

## 📊 部署後監控

### Google Analytics（可選）
1. 建立 Google Analytics 帳號
2. 複製追蹤代碼
3. 在 `index.html` 的 `</head>` 前貼上：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console（推薦）
1. 登入 Google Search Console
2. 新增您的網站
3. 驗證所有權
4. 提交 sitemap

### 定期維護
- 每月檢查連結是否有效
- 更新內容與成就
- 監控訪客流量
- 收集訪客反饋

---

## 🚀 自訂域名設定

### 購買域名
推薦服務：
- Namecheap
- GoDaddy
- Google Domains
- Gandi

### 指向 GitHub Pages
1. 購買域名後進入 DNS 設定
2. 新增 A 記錄指向 GitHub Pages IP：
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. 新增 CNAME 記錄：`www` → `YOUR_USERNAME.github.io`
4. 在 GitHub 倉庫設定中新增自訂域名

### 指向 Netlify
1. 進入 Netlify Site settings
2. 選擇 "Domain management"
3. 新增自訂域名
4. 複製 Netlify 提供的 nameserver
5. 在域名提供商設定 nameserver

---

## 🔐 HTTPS 與安全性

所有現代部署平台都自動提供 HTTPS：
- GitHub Pages：自動 HTTPS
- Netlify：自動 HTTPS
- Vercel：自動 HTTPS
- AWS：使用 ACM 免費證書

---

## 📱 行動應用化（可選）

### 建立 PWA（Progressive Web App）
在 `index.html` 的 `<head>` 中新增：
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#1e3a8a">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="images/個人形象照.jpg">
```

建立 `manifest.json`：
```json
{
  "name": "林鼎淵 - AI 工作術專家",
  "short_name": "Dean Lin",
  "description": "AI 與全端開發專家的個人形象網站",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e3a8a",
  "icons": [
    {
      "src": "images/個人形象照.jpg",
      "sizes": "192x192",
      "type": "image/jpeg"
    }
  ]
}
```

---

## 🆘 常見問題

### Q: 圖片無法顯示
**A:** 檢查圖片路徑是否正確，確保使用相對路徑 `images/檔名.jpg`

### Q: 樣式沒有載入
**A:** 檢查 CSS 檔案是否在正確位置，清除瀏覽器快取（Ctrl+Shift+Delete）

### Q: 互動效果不工作
**A:** 檢查 JavaScript 是否已載入，在瀏覽器控制台查看錯誤訊息

### Q: 部署後頁面空白
**A:** 檢查伺服器是否正確提供 HTML 檔案，確保 `index.html` 在根目錄

### Q: 響應式設計在手機上不工作
**A:** 確保 `<meta name="viewport">` 標籤存在於 `<head>` 中

---

## 📞 技術支援

如有部署問題，請聯繫：
- Email：babydragon9703111@gmail.com
- Facebook：https://www.facebook.com/deanlinbao

---

**最後更新**：2026 年 5 月 7 日
