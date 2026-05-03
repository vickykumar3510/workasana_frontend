import "../App.css";
import { useContext } from "react";
import TeamContext from "../contexts/TeamContext";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const TeamManagement = () => {
  const { loading, teams } = useContext(TeamContext);

  return (
    <div className="team-management-bg">
      <h1 className="page-title">Teams Management</h1>

      <main className="container">
        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        <div className="flexBoxes">
          <Sidebar />

          <div className="contentArea pm-content">
            <h3>Team List</h3>

            {teams.length === 0 ? (
              <p>No teams found</p>
            ) : (
              <ul>
                {teams.map((t) => (
                  <li className="team-name rowBox" key={t._id}>
                    {t.name}
                  </li>
                ))}
              </ul>
            )}
            <button className="form-Btn">
              <Link className="removeLine line-txt" to="/newteamform">
                Add New Team
              </Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;