import FeatureCard from "../components/FeatureCard";

function Home() {
  return (
    <div className="container mt-5">
      <h2 className="text-center page-title">
        Simple & Reliable Document Tools
      </h2>
      <p className="text-center page-subtitle">
        Compress and convert PDF, image, and Word files in one place
      </p>

      <div className="row mt-4">
        <FeatureCard
          icon="📉"
          title="File Compression"
          desc="Reduce the size of PDF and image files"
          link="/compress"
        />
        <FeatureCard
          icon="🖼️"
          title="PDF to Image"
          desc="Convert PDF pages into high-quality images"
          link="/pdf-to-image"
        />
        <FeatureCard
          icon="📄"
          title="Image to PDF"
          desc="Merge one or more images into a single PDF"
          link="/image-to-pdf"
        />
        <FeatureCard
          icon="📝"
          title="Word to PDF"
          desc="Convert Word documents into PDF format"
          link="/word-to-pdf"
        />
      </div>
    </div>
  );
}

export default Home;
