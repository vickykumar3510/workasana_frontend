import "../App.css"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import ProjectContext from "../contexts/ProjectContext"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const NewProjectForm = () => {
  const navigate = useNavigate()
  const { addProject, loading } = useContext(ProjectContext)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !name.trim() ||
      !description.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await addProject({ name, description })
      toast.success("New Project created.");
      setName("")
      setDescription("")
      navigate('/allprojects')
    } catch {
      toast.error("Failed to create project. Please try again.");
    }
  }

  return (
    <div className="formPg-bg">
      <h1 className='page-title'>New Project Form</h1>

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
            <h3>Create a new project</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <br />

              <div className="form-row">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                style={{ marginLeft: "112px" }}
                className='submit-btn'
                type="submit"
                disabled={!name.trim() || !description.trim()}
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NewProjectForm