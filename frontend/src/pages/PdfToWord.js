import UploadForm from "../components/UploadForm";

function PdfToWord() {
  return (
    <UploadForm
      title="PDF to Word"
      subtitle="Convert PDF text into editable Word document"
      url="pdf-to-word"
      accept=".pdf"
    />
  );
}

export default PdfToWord;
