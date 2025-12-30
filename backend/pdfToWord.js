const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { Document, Packer, Paragraph } = require("docx");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    const paragraphs = data.text.split("\n").map((line) => new Paragraph(line));

    const doc = new Document({
      sections: [{ children: paragraphs }],
    });

    const buffer = await Packer.toBuffer(doc);
    const outputPath = `outputs/pdf-to-word-${Date.now()}.docx`;
    fs.writeFileSync(outputPath, buffer);

    res.json({
      download: `http://localhost:5000/${outputPath}`,
    });
  } catch (err) {
    console.error("PDF to Word error:", err);
    res.status(500).json({ error: "PDF to Word conversion failed" });
  }
});

module.exports = router;
