const express = require("express");
const multer = require("multer");
const pdfPoppler = require("pdf-poppler");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF allowed" });
    }

    const baseName = Date.now().toString();
    const imageDir = path.join("outputs", baseName);
    fs.mkdirSync(imageDir, { recursive: true });

    const opts = {
      format: "png",
      out_dir: imageDir,
      out_prefix: "page",
      page: null,
    };

    await pdfPoppler.convert(req.file.path, opts);

    const images = fs.readdirSync(imageDir).filter((f) => f.endsWith(".png"));

    // ✅ SINGLE IMAGE → DIRECT DOWNLOAD
    if (images.length === 1) {
      const imgPath = path.join(imageDir, images[0]);
      return res.json({
        type: "single",
        download: `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`,
      });
    }

    // ✅ MULTIPLE IMAGES → ZIP
    const zipPath = path.join("outputs", `${baseName}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    archive.pipe(output);
    images.forEach((img) => {
      archive.file(path.join(imageDir, img), { name: img });
    });

    await archive.finalize();

    res.json({
      type: "zip",
      download: `http://localhost:5000/${zipPath.replace(/\\/g, "/")}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF to Image conversion failed" });
  }
});

module.exports = router;
