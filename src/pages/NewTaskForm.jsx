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
import MultiSelectDropdown from "../components/MultiSelectDropdown";

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
  const [priority, setPriority] = useState("Medium");
  const [project, setProject] = useState("");

  // Calculate days
  const calculateDays = (due) => {
    const today = new Date();
    const diffTime = due - today;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const handleDueDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-");
    // Construct local date (not UTC)
    const localDate = new Date(year, month - 1, day);
  
    setDueDate(e.target.value);
    setTimeToComplete(calculateDays(localDate));
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
    setPriority("Medium");
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
      priority,
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
            <h3>Create task for project</h3>

            <form onSubmit={handleSubmit}>
              {/* PROJECT */}
              <div className="form-row">
                <label htmlFor="project">Project:</label>
                <select
                  id="project"
                  name="project"
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
              </div>

              <br />

              {/* TASK NAME */}
              <div className="form-row">
                <label htmlFor="taskName">Task Name:</label>
                <input
                  type="text"
                  id="taskName"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <br />

              {/* TEAM */}
              <div className="form-row">
                <label htmlFor="team">Team:</label>
                <select
                  id="team"
                  name="team"
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
                <label htmlFor="owners">Owners:</label>
                <MultiSelectDropdown
                  id="owners"
                  placeholder="Select owners"
                  options={owners.map((o) => ({
                    value: o._id,
                    label: o.name,
                  }))}
                  selected={ownerSelected}
                  onChange={setSelectedOwner}
                />
              </div>

              <br />

              {/* TAGS (MULTI) */}
              <div className="form-row">
                <label htmlFor="tags">Tags:</label>
                <MultiSelectDropdown
                  id="tags"
                  placeholder="Select tags"
                  options={tags.map((t) => ({
                    value: t._id,
                    label: t.name,
                  }))}
                  selected={tagSelected}
                  onChange={setSelectedTag}
                />
              </div>

              <br />

              {/* ADD TAG (no visible label; spacer via CSS ::before) */}
              <div className="form-row form-row-add-tag-row">
                <div className="form-row-add-tag-field">
                  <input
                    id="newTagName"
                    name="newTagName"
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
                <label htmlFor="dueDate">Due Date:</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>

              <br />

              {/* TIME */}
              <div className="form-row">
                <label htmlFor="timeToComplete">Time (Days):</label>
                <input
                  type="number"
                  id="timeToComplete"
                  name="timeToComplete"
                  value={timeToComplete}
                  readOnly
                />
              </div>

              <br />

              {/* STATUS */}
              <div className="form-row">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
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

              {/* PRIORITY */}
              <div className="form-row">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
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