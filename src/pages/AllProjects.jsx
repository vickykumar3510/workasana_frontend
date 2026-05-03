import "../App.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import ProjectContext from "../contexts/ProjectContext";
import TaskContext from "../contexts/TaskContext";
import Sidebar from "../components/Sidebar";

const AllProjects = () => {
  const { projects, loading } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);

  const [selectedOwner, setSelectedOwner] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const owners = Array.from(
    new Map(
      tasks
        .flatMap((task) => task.owners)
        .map((owner) => [owner._id, owner])
    ).values()
  );

  const projectIdsForOwner = selectedOwner
    ? new Set(
        tasks
          .filter((task) =>
            task.owners.some((owner) => owner._id === selectedOwner)
          )
          .map((task) => task.project)
      )
    : null;

  const filteredProjects = selectedOwner
    ? projects.filter((project) => projectIdsForOwner.has(project._id))
    : projects;

  return (
    <div className="all-Projects-bg">
      <h1 className="page-title">List of all Projects</h1>

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
            <h3>Projects</h3>

            <ul className="projectList-all">
              {filteredProjects.length === 0 ? (
                <li className="projectList-empty" key="project-list-empty">
                  No projects found.
                </li>
              ) : (
                filteredProjects.map((project) => (
                  <li key={project._id} className="rowBox projectList-row">
                    <Link
                      className="project-name removeLine projectList-row-title"
                      to={`/projectmanagement/${project._id}`}
                    >
                      {project.name}
                    </Link>
                    <p className="projectList-row-desc">{project.description}</p>
                    <div className="projectList-row-meta">
                      <span className="projectList-row-date">
                        Created {formatDate(project.createdAt)}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <button className="form-Btn">
              <Link className="removeLine line-txt" to="/newprojectform">
                Add a Project
              </Link>
            </button>

            <section className="pm-panel" aria-label="Project filters">
              <h4 className="pm-panel-title">Filters</h4>
              <div className="pm-filters">
                <div className="simpleFilter pm-filter-row">
                  <label htmlFor="ownerSelect">By owner</label>
                  <select
                    id="ownerSelect"
                    value={selectedOwner}
                    onChange={(e) => setSelectedOwner(e.target.value)}
                  >
                    <option value="">All Owners</option>
                    {owners.map((owner) => (
                      <option key={owner._id} value={owner._id}>
                        {owner.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllProjects;