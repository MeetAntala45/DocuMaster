const express = require("express");
const cors = require("cors");

const compress = require("./compress");
const pdfToImage = require("./pdfToImage");
const imageToPdf = require("./imageToPdf");
const wordToPdf = require("./wordToPdf");
const pdfToWord = require("./pdfToWord");
const pdfMerge = require("./pdfMerge");
const pdfWatermark = require("./pdfWatermark");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/outputs", express.static("outputs"));

app.use("/api/compress", compress);
app.use("/api/pdf-to-image", pdfToImage);
app.use("/api/image-to-pdf", imageToPdf);
app.use("/api/word-to-pdf", wordToPdf);
app.use("/api/pdf-to-word", pdfToWord);
app.use("/api/pdf-merge", pdfMerge);
app.use("/api/pdf-watermark", pdfWatermark);


app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
