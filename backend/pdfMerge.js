const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ error: "Upload at least two PDFs" });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    const outputPath = `outputs/merged-${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, mergedBytes);

    res.json({
      download: `http://localhost:5000/${outputPath}`
    });

  } catch (err) {
    console.error("PDF Merge error:", err);
    res.status(500).json({ error: "PDF merge failed" });
  }
});

module.exports = router;
