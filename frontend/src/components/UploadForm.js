import axios from "axios";
import { useState } from "react";

function UploadForm({ title, subtitle, url, accept, multiple }) {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const downloadFile = async (downloadUrl) => {
    const response = await axios.get(downloadUrl, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    link.download = downloadUrl.split("/").pop(); // filename
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const submit = async () => {
    if (!files || files.length === 0) {
      setError("Please select a file first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setInfo(null);

      const formData = new FormData();

      if (multiple) {
        for (let f of files) formData.append("files", f);
      } else {
        formData.append("file", files[0]);
      }

      const res = await axios.post(
        `http://localhost:5000/api/${url}`,
        formData
      );

      setInfo(res.data);

      // 🔽 FORCE LOCAL DOWNLOAD
      if (res.data.download) {
        await downloadFile(res.data.download);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Processing failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="page-title">{title}</h3>
      <p className="page-subtitle">{subtitle}</p>

      <div className="upload-box shadow-sm">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="form-control"
          onChange={(e) => setFiles(e.target.files)}
        />

        <button
          className="btn btn-primary mt-3"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Process"}
        </button>

        {error && <p className="text-danger mt-3">{error}</p>}
      </div>

      {info?.download && (
        <div className="result-box shadow-sm text-center">
          <p className="text-success mb-0">
            ✅ File downloaded to your computer
          </p>
        </div>
      )}

      {info?.originalSize && (
        <div className="result-box shadow-sm mt-3">
          <p>Original Size: {info.originalSize} bytes</p>
          <p>Compressed Size: {info.compressedSize} bytes</p>
          {info.reduction && <p>Reduction: {info.reduction}</p>}
        </div>
      )}
    </div>
  );
}

export default UploadForm;
