import { Link } from "react-router-dom";

export default function Brand({ compact = false }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} to="/" aria-label="AgriPro+ home">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="img">
          <path d="M20 34V17" />
          <path d="M20 24c-8 0-12-4-12-12 8 0 12 4 12 12Z" />
          <path d="M20 19c0-8 4-12 12-12 0 8-4 12-12 12Z" />
          <path d="M10 34h20" />
        </svg>
      </span>
      <span className="brand__word">AgriPro<span>+</span></span>
      {!compact && <span className="brand__descriptor">Field intelligence</span>}
    </Link>
  );
}
