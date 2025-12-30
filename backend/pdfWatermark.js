const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PDFDocument, rgb, degrees } = require("pdf-lib");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const watermarkText = req.body.text;

    if (!req.file || !watermarkText) {
      return res.status(400).json({ error: "PDF file and watermark text required" });
    }

    const existingPdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    pages.forEach(page => {
      const { width, height } = page.getSize();

      page.drawText(watermarkText, {
        x: width / 4,
        y: height / 2,
        size: 40,
        rotate: degrees(-45),
        color: rgb(0.75, 0.75, 0.75),
        opacity: 0.4
      });
    });

    const pdfBytes = await pdfDoc.save();
    const outputPath = `outputs/watermark-${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, pdfBytes);

    res.json({
      download: `http://localhost:5000/${outputPath}`
    });

  } catch (err) {
    console.error("PDF Watermark error:", err);
    res.status(500).json({ error: "PDF watermarking failed" });
  }
});

module.exports = router;
