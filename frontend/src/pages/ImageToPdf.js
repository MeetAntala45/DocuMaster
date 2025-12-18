import UploadForm from "../components/UploadForm";

function ImageToPdf() {
  return (
    <UploadForm
      title="Image to PDF"
      subtitle="Merge one or more images into a PDF"
      url="image-to-pdf"
      accept="image/*"
      multiple
    />
  );
}

export default ImageToPdf;
