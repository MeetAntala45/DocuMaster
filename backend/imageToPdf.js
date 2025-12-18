const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const imageBytes = fs.readFileSync(file.path);
      const ext = path.extname(file.originalname).toLowerCase();

      let image;

      // ✅ Correct embedding based on image type
      if (ext === ".jpg" || ext === ".jpeg") {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (ext === ".png") {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        return res.status(400).json({
          error: "Only JPG and PNG images are supported",
        });
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = `outputs/images-${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, pdfBytes);

    res.json({
      download: `http://localhost:5000/${outputPath}`,
    });
  } catch (err) {
    console.error("Image to PDF error:", err);
    res.status(500).json({ error: "Image to PDF conversion failed" });
  }
});

module.exports = router;
