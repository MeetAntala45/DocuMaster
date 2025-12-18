import UploadForm from "../components/UploadForm";

function WordToPdf() {
  return (
    <UploadForm
      title="Word to PDF"
      subtitle="Convert Word documents into PDF"
      url="word-to-pdf"
      accept=".doc,.docx"
    />
  );
}

export default WordToPdf;
