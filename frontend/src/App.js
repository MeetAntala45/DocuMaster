import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Compress from "./pages/Compress";
import PdfToImage from "./pages/PdfToImage";
import ImageToPdf from "./pages/ImageToPdf";
import WordToPdf from "./pages/WordToPdf";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compress" element={<Compress />} />
        <Route path="/pdf-to-image" element={<PdfToImage />} />
        <Route path="/image-to-pdf" element={<ImageToPdf />} />
        <Route path="/word-to-pdf" element={<WordToPdf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
