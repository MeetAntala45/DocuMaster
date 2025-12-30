import { useState } from "react";
import axios from "axios";

function PdfWatermark() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!file || !text) {
      alert("Please select PDF and enter watermark text");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/pdf-watermark",
        formData
      );
      window.location.href = res.data.download;
    } catch {
      alert("PDF watermark failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3>PDF Watermark</h3>
      <p>Add text watermark to PDF pages</p>

      <input
        type="file"
        accept=".pdf"
        className="form-control mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <input
        type="text"
        placeholder="Enter watermark text"
        className="form-control mb-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-primary" onClick={submit} disabled={loading}>
        {loading ? "Processing..." : "Add Watermark"}
      </button>
    </div>
  );
}

export default PdfWatermark;
