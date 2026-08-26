import { useState } from "react";
import { LuLogOut, LuMenu, LuSparkles, LuX } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Brand from "./Brand";

const links = [["/crops", "Crop AI"], ["/schemes", "Schemes"], ["/knowledge", "Knowledge"], ["/support", "Support"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary navigation">
        <Brand compact />
        <button className="nav__toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <LuX /> : <LuMenu />}
        </button>
        <div className={`nav__panel ${open ? "is-open" : ""}`}>
          <div className="nav__links">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "is-active" : "")}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="nav__actions">
            {currentUser ? (
              <>
                <Link className="user-chip" to="/crops" onClick={() => setOpen(false)}>
                  {currentUser.photoURL ? <img src={currentUser.photoURL} alt="" referrerPolicy="no-referrer" /> : <span>{(currentUser.displayName || currentUser.email || "F")[0].toUpperCase()}</span>}
                  <span>{currentUser.displayName?.split(" ")[0] || "My field"}</span>
                </Link>
                <button className="icon-action" onClick={handleLogout} aria-label="Sign out"><LuLogOut /></button>
              </>
            ) : (
              <>
                <Link className="text-action" to="/login" onClick={() => setOpen(false)}>Sign in</Link>
                <Link className="button button--small button--lime" to="/signup" onClick={() => setOpen(false)}><LuSparkles /> Get started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
