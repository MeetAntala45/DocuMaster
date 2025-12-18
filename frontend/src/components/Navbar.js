import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div style={{ fontSize: "1.4rem", fontWeight: "600" }}>
            📄 DocuMaster
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#6c757d",
              marginTop: "-6px",
            }}
          >
            Simple & reliable document tools
          </div>
        </Link>

        {/* Fake Links */}
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item mx-2">
            <span className="nav-link text-muted" style={{ cursor: "pointer" }}>
              Tools
            </span>
          </li>

          <li className="nav-item mx-2">
            <span className="nav-link text-muted" style={{ cursor: "pointer" }}>
              Features
            </span>
          </li>

          <li className="nav-item mx-2">
            <span className="nav-link text-muted" style={{ cursor: "pointer" }}>
              Help
            </span>
          </li>

          <li className="nav-item mx-2">
            <span className="nav-link text-muted" style={{ cursor: "pointer" }}>
              About
            </span>
          </li>

          <li className="nav-item ms-3">
            <button className="btn btn-outline-primary btn-sm" disabled>
              Demo Mode
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
