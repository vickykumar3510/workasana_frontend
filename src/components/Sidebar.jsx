import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    toast.success("Logout successfully.");
  };

  return (
    <div className="stickySidebarWrap">
      <nav className="sidebarCSS">
        <h3 className="company-name">workasana</h3>

        <Link className="removeLine" to="/dashboard">Dashboard</Link>
        <Link className="removeLine" to="/allprojects">Projects</Link>
        <Link className="removeLine" to="/teammanagement">Team</Link>
        <Link className="removeLine" to="/reports">Reports</Link>
        <Link className="removeLine" to="/settings">Settings</Link>

        <button className="logOutBtn" onClick={logout}>Log Out</button>
      </nav>
    </div>
  );
}

export default Sidebar;