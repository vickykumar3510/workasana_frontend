import "../App.css";
import OwnerContext from "../contexts/OwnerContext";
import ProjectContext from "../contexts/ProjectContext";
import TaskContext from "../contexts/TaskContext";
import TeamContext from "../contexts/TeamContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const { teams, loading, setTeams } = useContext(TeamContext);
  const { tasks, setTasks } = useContext(TaskContext);
  const { projects, setProjects } = useContext(ProjectContext);
  const { owners } = useContext(OwnerContext);

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(
        `https://major-project-3-backend.vercel.app/tasks/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
        toast.success("Task Deleted Successfully.");
      }
    } catch (error) {
      console.log("Failed to delete task", error);
      toast.error("Failed to delete task");
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      const res = await fetch(
        `https://major-project-3-backend.vercel.app/teams/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setTeams((prev) => prev.filter((team) => team._id !== id));
        toast.success("Team Deleted Successfully.");
      }
    } catch (error) {
      console.log("Failed to delete team", error);
      toast.error("Failed to delete team");
    }
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Deleting this project will also delete all related tasks. Continue?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://major-project-3-backend.vercel.app/projects/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setProjects((prev) => prev.filter((project) => project._id !== id));
        setTasks((prev) => prev.filter((task) => task.project !== id));
        toast.success("Project and related tasks deleted successfully.");
      }
    } catch (error) {
      console.log("Failed to delete project", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="settings-bg">
      <h1 className="page-title">Manage Data</h1>

      <main className="container">
        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        <div className="flexBoxes">
          <Sidebar />

          <div className="contentArea">
            <div className="flexBoxesSetting">
              <div>
                <h3>Tasks</h3>
                {tasks?.length > 0 ? (
                  <ul>
                    {tasks.map((t) => (
                      <li className="task-name-noHover" key={t._id}>
                        {t.name}
                        <button
                          className="deletBtn"
                          onClick={() => handleDeleteTask(t._id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks found</p>
                )}
              </div>

              <div>
                <h3>Teams</h3>
                {teams?.length > 0 ? (
                  <ul>
                    {teams.map((t) => (
                      <li className="team-name" key={t._id}>
                        {t.name}
                        <button
                          className="deletBtn"
                          onClick={() => handleDeleteTeam(t._id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No teams found</p>
                )}
              </div>

              <div>
                <h3>Projects</h3>
                {projects?.length > 0 ? (
                  <ul>
                    {projects.map((p) => (
                      <li className="project-name-noHover" key={p._id}>
                        {p.name}
                        <button
                          className="deletBtn"
                          onClick={() => handleDeleteProject(p._id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No projects found</p>
                )}
              </div>

              <div>
                <h3>Owners</h3>
                {owners?.length > 0 ? (
                  <ul>
                    {owners.map((o) => (
                      <li className="owner-list" key={o._id}>
                        {o.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No owners found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;