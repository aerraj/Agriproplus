import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div>
          <Brand compact />
          <p>Practical intelligence for every field, from soil reading to market decision.</p>
        </div>
        <div>
          <span className="footer__label">Platform</span>
          <Link to="/crops">Crop AI</Link><Link to="/schemes">Schemes</Link><Link to="/knowledge">Knowledge</Link>
        </div>
        <div>
          <span className="footer__label">Support</span>
          <Link to="/support">Talk to us</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a href="https://agmarknet.gov.in/" target="_blank" rel="noreferrer">Mandi prices</a>
          <a href="https://mausam.imd.gov.in/" target="_blank" rel="noreferrer">Weather</a>
        </div>
        <div className="footer__mission"><span>Built in India</span><strong>For the people who feed it.</strong></div>
      </div>
      <div className="shell footer__bottom"><span>© 2026 AgriPro+</span><span>Decision support, not a substitute for local agronomic advice.</span></div>
    </footer>
  );
}
