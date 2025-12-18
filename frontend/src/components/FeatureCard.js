import { Link } from "react-router-dom";

function FeatureCard({ icon, title, desc, link }) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm text-center p-4">
        <div style={{ fontSize: "40px" }}>{icon}</div>
        <h5 className="mt-3">{title}</h5>
        <p className="text-muted small">{desc}</p>
        <Link to={link} className="btn btn-outline-primary mt-2">
          Open
        </Link>
      </div>
    </div>
  );
}

export default FeatureCard;
