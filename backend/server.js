const express = require("express");
const cors = require("cors");

const compress = require("./compress");
const pdfToImage = require("./pdfToImage");
const imageToPdf = require("./imageToPdf");
const wordToPdf = require("./wordToPdf");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/outputs", express.static("outputs"));

app.use("/api/compress", compress);
app.use("/api/pdf-to-image", pdfToImage);
app.use("/api/image-to-pdf", imageToPdf);
app.use("/api/word-to-pdf", wordToPdf);

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
