import UploadForm from "../components/UploadForm";

function PdfToImage() {
  return (
    <UploadForm
      title="PDF to Image"
      subtitle="Convert PDF pages into images"
      url="pdf-to-image"
      accept=".pdf"
    />
  );
}

export default PdfToImage;
