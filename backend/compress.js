const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const outputPath = `outputs/compressed-${Date.now()}${ext}`;

    const originalSize = fs.statSync(inputPath).size;

    // 🟢 IMAGE COMPRESSION
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      await sharp(inputPath)
        .jpeg({
          quality: 50,
          mozjpeg: true,
        })
        .toFile(outputPath);
    }

    // 🟢 PDF COMPRESSION (REAL)
    else if (ext === ".pdf") {
      const gsPath = `"C:\\Program Files\\gs\\gs10.06.0\\bin\\gswin64c.exe"`;

      const command = `${gsPath} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

      await new Promise((resolve, reject) => {
        exec(command, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } else {
      return res.status(400).json({
        error: "Unsupported file format",
      });
    }

    const compressedSize = fs.statSync(outputPath).size;

    res.json({
      originalSize,
      compressedSize,
      reduction:
        (((originalSize - compressedSize) / originalSize) * 100).toFixed(2) +
        "%",
      download: `http://localhost:5000/${outputPath}`,
    });
  } catch (err) {
    console.error("Compression error:", err);
    res.status(500).json({
      error: "Compression failed",
    });
  }
});

module.exports = router;
