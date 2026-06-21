import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    toast.success("Logout successfully.");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="stickySidebarWrap">
      <nav className={`sidebarCSS ${isMenuOpen ? "sidebarCSS--open" : ""}`}>
        <div className="sidebarCSS-top">
          <Link className="sidebarCSS-brand removeLine" to="/dashboard" onClick={closeMenu}>
            <h3 className="company-name">workasana</h3>
          </Link>

          <button
            type="button"
            className="sidebar-menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sidebar-menu-toggle-bar" />
            <span className="sidebar-menu-toggle-bar" />
            <span className="sidebar-menu-toggle-bar" />
          </button>
        </div>

        <div className="sidebarCSS-nav">
          <Link className="removeLine" to="/dashboard" onClick={closeMenu}>
            Dashboard
          </Link>
          <Link className="removeLine" to="/allprojects" onClick={closeMenu}>
            Projects
          </Link>
          <Link className="removeLine" to="/teammanagement" onClick={closeMenu}>
            Team
          </Link>
          <Link className="removeLine" to="/reports" onClick={closeMenu}>
            Reports
          </Link>
          <Link className="removeLine" to="/settings" onClick={closeMenu}>
            Settings
          </Link>

          <button className="logOutBtn" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
