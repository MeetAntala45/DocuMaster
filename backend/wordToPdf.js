const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1️⃣ Word → HTML
    const result = await mammoth.convertToHtml({
      path: req.file.path,
    });

    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial; padding: 40px; }
          </style>
        </head>
        <body>
          ${result.value}
        </body>
      </html>
    `;

    // 2️⃣ HTML → PDF (REAL PDF)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const outputPath = path.join("outputs", "word.pdf");
    await page.pdf({ path: outputPath, format: "A4" });

    await browser.close();

    res.json({
      download: `http://localhost:5000/${outputPath.replace(/\\/g, "/")}`,
    });
  } catch (err) {
    console.error("❌ Word to PDF error:", err);
    res.status(500).json({ error: "Word to PDF conversion failed" });
  }
});

module.exports = router;
