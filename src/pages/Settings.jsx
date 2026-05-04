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
            <div className="settings-sections-stack">
              <section
                className="settings-data-panel"
                aria-labelledby="settings-heading-tasks"
              >
                <h3 id="settings-heading-tasks">Tasks</h3>
                {tasks?.length > 0 ? (
                  <div className="settings-table-wrap">
                    <table className="settings-data-table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col" className="settings-col-action">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((t) => (
                          <tr key={t._id}>
                            <td className="task-name-noHover">{t.name}</td>
                            <td className="settings-col-action">
                              <button
                                type="button"
                                className="deletBtn"
                                onClick={() => handleDeleteTask(t._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No tasks found</p>
                )}
              </section>

              <section
                className="settings-data-panel"
                aria-labelledby="settings-heading-teams"
              >
                <h3 id="settings-heading-teams">Teams</h3>
                {teams?.length > 0 ? (
                  <div className="settings-table-wrap">
                    <table className="settings-data-table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col" className="settings-col-action">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map((t) => (
                          <tr key={t._id}>
                            <td className="team-name">{t.name}</td>
                            <td className="settings-col-action">
                              <button
                                type="button"
                                className="deletBtn"
                                onClick={() => handleDeleteTeam(t._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No teams found</p>
                )}
              </section>

              <section
                className="settings-data-panel"
                aria-labelledby="settings-heading-projects"
              >
                <h3 id="settings-heading-projects">Projects</h3>
                {projects?.length > 0 ? (
                  <div className="settings-table-wrap">
                    <table className="settings-data-table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col" className="settings-col-action">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((p) => (
                          <tr key={p._id}>
                            <td className="project-name-noHover">{p.name}</td>
                            <td className="settings-col-action">
                              <button
                                type="button"
                                className="deletBtn"
                                onClick={() => handleDeleteProject(p._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No projects found</p>
                )}
              </section>

              <section
                className="settings-data-panel"
                aria-labelledby="settings-heading-owners"
              >
                <h3 id="settings-heading-owners">Owners</h3>
                {owners?.length > 0 ? (
                  <div className="settings-table-wrap">
                    <table className="settings-data-table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {owners.map((o) => (
                          <tr key={o._id}>
                            <td className="owner-list">{o.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No owners found</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;