import UploadForm from "../components/UploadForm";

function Compress() {
  return (
    <UploadForm
      title="File Compression"
      subtitle="Compress PDF and image files while preserving quality"
      url="compress"
      accept=".pdf,image/*"
    />
  );
}

export default Compress;
