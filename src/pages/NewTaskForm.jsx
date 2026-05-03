import "../App.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import TeamContext from "../contexts/TeamContext";
import OwnerContext from "../contexts/OwnerContext";
import TagContext from "../contexts/TagContext";
import ProjectContext from "../contexts/ProjectContext";
import TaskContext from "../contexts/TaskContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const NewTaskForm = () => {
  const navigate = useNavigate()
  const { teams } = useContext(TeamContext);
  const { projects, loading } = useContext(ProjectContext);
  const { owners } = useContext(OwnerContext);
  const { tags, addTag } = useContext(TagContext);
  const { addTask } = useContext(TaskContext);

  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [ownerSelected, setSelectedOwner] = useState([]);
  const [tagSelected, setSelectedTag] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [status, setStatus] = useState("To Do");
  const [project, setProject] = useState("");

  // Calculate days
  const calculateDays = (selectedDate) => {
    const today = new Date();
    const due = new Date(selectedDate);
    const diffTime = due - today;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const handleDueDateChange = (e) => {
    const date = e.target.value;
    setDueDate(date);
    setTimeToComplete(calculateDays(date));
  };

  // Add new tag
  const handleAddTag = async () => {
    if (!newTagName.trim()) {
      toast.error("Tag name cannot be empty");
      return;
    }

    const exists = tags.some(
      (t) => t.name.toLowerCase() === newTagName.toLowerCase()
    );

    if (exists) {
      toast.error("Tag already exists");
      return;
    }

    try {
      const createdTag = await addTag({ name: newTagName.trim() });

      setSelectedTag((prev) => [...prev, createdTag._id]);
      setNewTagName("");
      toast.success("Tag added");
    } catch {
      toast.error("Failed to add tag");
    }
  };

  const resetForm = () => {
    setName("");
    setTeam("");
    setSelectedOwner([]);
    setSelectedTag([]);
    setNewTagName("");
    setDueDate("");
    setTimeToComplete(0);
    setStatus("To Do");
    setProject("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !project ||
      !team ||
      ownerSelected.length === 0 ||
      !dueDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    await addTask({
      name,
      team,
      owners: ownerSelected,
      tags: tagSelected,
      dueDate,
      timeToComplete,
      status,
      project,
    });

    navigate('/dashboard')
    toast.success("New Task created");
    resetForm();
  };

  return (
    <div className="formPg-bg">
      <h1 className='page-title'>New Task Form</h1>

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
            <h3>
              Create task for project
              <span className="form-row">
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </span>
            </h3>

            <form onSubmit={handleSubmit}>
              {/* TASK NAME */}
              <div className="form-row">
                <label>Task Name:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <br />

              {/* TEAM */}
              <div className="form-row">
                <label>Team:</label>
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                >
                  <option value="">Select Team</option>
                  {teams.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <br />

              {/* OWNERS (MULTI) */}
              <div className="form-row">
                <label>Owners:</label>
                <select
                  multiple
                  value={ownerSelected}
                  onChange={(e) =>
                    setSelectedOwner(
                      Array.from(
                        e.target.selectedOptions,
                        (o) => o.value
                      )
                    )
                  }
                >
                  {owners.map((o) => (
                    <option key={o._id} value={o._id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>

              <br />

              {/* TAGS (MULTI) */}
              <div className="form-row">
                <label>Tags:</label>
                <select
                  multiple
                  value={tagSelected}
                  onChange={(e) =>
                    setSelectedTag(
                      Array.from(
                        e.target.selectedOptions,
                        (t) => t.value
                      )
                    )
                  }
                >
                  {tags.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <br />

              {/* ADD TAG (no visible label; spacer via CSS ::before) */}
              <div className="form-row form-row-add-tag-row">
                <div className="form-row-add-tag-field">
                  <input
                    placeholder="Add new tag"
                    aria-label="Add new tag name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="form-row-add-tag-btn"
                    onClick={handleAddTag}
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              <br />

              {/* DUE DATE */}
              <div className="form-row">
                <label>Due Date:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>

              <br />

              {/* TIME */}
              <div className="form-row">
                <label>Time (Days):</label>
                <input
                  type="number"
                  value={timeToComplete}
                  readOnly
                />
              </div>

              <br />

              {/* STATUS */}
              <div className="form-row">
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Blocked</option>
                </select>
              </div>

              <br />

              <button
                className="submit-btn"
                type="submit"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewTaskForm;