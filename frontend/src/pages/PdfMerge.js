import UploadForm from "../components/UploadForm";

function PdfMerge() {
  return (
    <UploadForm
      title="PDF Merge"
      subtitle="Merge multiple PDF files into a single document"
      url="pdf-merge"
      accept=".pdf"
      multiple
    />
  );
}

export default PdfMerge;
