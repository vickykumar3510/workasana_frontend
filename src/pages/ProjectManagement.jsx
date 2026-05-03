import '../App.css'
import { Link, useParams } from "react-router-dom"
import ProjectContext from "../contexts/ProjectContext"
import TaskContext from "../contexts/TaskContext"
import OwnerContext from '../contexts/OwnerContext'
import TagContext from '../contexts/TagContext'
import { useContext, useState } from "react"
import Sidebar from "../components/Sidebar"

const ProjectManagement = () => {
  const { projectId } = useParams()
  const { projects, loading } = useContext(ProjectContext)
  const { tasks } = useContext(TaskContext)
  const { owners } = useContext(OwnerContext)
  const { tags } = useContext(TagContext)

  // owner, tag, and sort state
  const [selectedOwner, setSelectedOwner] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [sortBy, setSortBy] = useState("")

  const calculateDueDate = (timeToComplete) => {
    const today = new Date()
    const dueDate = new Date(today)
    dueDate.setDate(today.getDate() + Number(timeToComplete))
    return dueDate
  }

  const selectedProject = projects.find((p) => p._id === projectId)
  const projectTasks = tasks.filter((t) => t.project === projectId)

  // Owner dropdown list
  const ownerList = Array.from(
    new Set(
      projectTasks.flatMap(task => task.owners?.map(o => o.name) || [])
    )
  )

  // Tag dropdown list (map tag IDs to names)
  const tagsList = Array.from(
    new Set(
      projectTasks.flatMap(task =>
        task.tags?.map(tagId => tags.find(tag => tag._id === tagId)?.name).filter(Boolean) || []
      )
    )
  )

  // Filter tasks by owner and tag
  let filteredTasks = projectTasks.filter(task => {
    const ownerMatch = selectedOwner ? task.owners?.some(o => o.name === selectedOwner) : true
    const tagMatch = selectedTag
      ? task.tags?.some(tagId => tags.find(tag => tag._id === tagId)?.name === selectedTag)
      : true
    return ownerMatch && tagMatch
  })

  // Sort tasks
  if (sortBy === "dueDate") {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      const dueA = calculateDueDate(a.timeToComplete)
      const dueB = calculateDueDate(b.timeToComplete)
      return dueA - dueB
    })
  } else if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    filteredTasks = [...filteredTasks].sort(
      (a, b) => (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
    )
  }

  return (
    <div className="project-management-bg">
      <h1 className='page-title'>
        Project:{" "}
        <span className="pm-title-accent">{selectedProject?.name}</span>
      </h1>

      <main className='container'>
        {loading ? (
          <div className="loader-container pm-page-loader">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {!selectedProject ? (
              <p className="pm-not-found">Project not found.</p>
            ) : (
              <>
                <div className="flexBoxes">

                  <Sidebar />

                  <div className="contentArea pm-content">
                    <header className="pm-header">
                      <h3 id="pm-task-heading">Task list</h3>
                      <p className="pm-lede">
                        Filter and sort tasks for this project. Totals reflect your selections.
                      </p>
                    </header>

                    {projectTasks.length === 0 ? (
                      <p className="pm-empty">No task found for this project.</p>
                    ) : (
                      <ul className="pm-task-list" aria-labelledby="pm-task-heading">
                        {filteredTasks.map((t) => {
                          const dueDate = calculateDueDate(t.timeToComplete)

                          return (
                            <li key={t._id} className="pm-task-item">
                              <article className="pm-task-card">
                                <div className="pm-task-card-head">
                                  <span className="pm-task-title">{t.name}</span>
                                  <span
                                    className={
                                      t.status === "Completed"
                                        ? "pm-status pm-status--done"
                                        : "pm-status pm-status--default"
                                    }
                                  >
                                    {t.status}
                                  </span>
                                </div>
                                <dl className="pm-task-meta">
                                  <div className="pm-meta-block">
                                    <dt className="pm-meta-label">Owners</dt>
                                    <dd className="pm-meta-value">
                                      <span className="pm-chip pm-chip--owner">
                                        {t.owners?.map(o => o.name).join(", ") || "—"}
                                      </span>
                                    </dd>
                                  </div>
                                  <div className="pm-meta-block">
                                    <dt className="pm-meta-label">Tags</dt>
                                    <dd className="pm-meta-value">
                                      <span className="pm-chip pm-chip--tag">
                                        {t.tags
                                          ?.map(tagId => tags.find(tag => tag._id === tagId)?.name)
                                          .filter(Boolean)
                                          .join(", ") || "—"}
                                      </span>
                                    </dd>
                                  </div>
                                  <div className="pm-meta-block pm-meta-block--due">
                                    <dt className="pm-meta-label">Due</dt>
                                    <dd className="pm-meta-value pm-due">
                                      {dueDate.toLocaleDateString()}
                                    </dd>
                                  </div>
                                </dl>
                              </article>
                            </li>
                          )
                        })}
                      </ul>
                    )}

                    <div className="pm-toolbar">
                      <Link to="/newtaskform" className="pm-add-wrap">
                        <button type="button" className='form-Btn line-txt'>
                          Add New Task
                        </button>
                      </Link>

                      <section className="pm-panel" aria-label="Task filters">
                        <h4 className="pm-panel-title">Filters</h4>
                        <div className="pm-filters">
                          <div className='simpleFilter pm-filter-row'>
                            <label htmlFor="owner">By owner</label>
                            <select
                              id="owner"
                              value={selectedOwner}
                              onChange={(e) => setSelectedOwner(e.target.value)}
                            >
                              <option value="">All</option>
                              {ownerList.map((o, index) => (
                                <option value={o} key={index}>{o}</option>
                              ))}
                            </select>
                          </div>

                          <div className='simpleFilter pm-filter-row'>
                            <label htmlFor="tag">By tag</label>
                            <select
                              id="tag"
                              value={selectedTag}
                              onChange={(e) => setSelectedTag(e.target.value)}
                            >
                              <option value="">All</option>
                              {tagsList.map((t, index) => (
                                <option value={t} key={index}>{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </section>

                      <section className="pm-panel pm-panel--sort" aria-label="Sort tasks">
                        <h4 className="pm-panel-title">Sort by</h4>
                        <div className="pm-sort-btns">
                          <button
                            type="button"
                            className={`rest-btn pm-sort-btn ${sortBy === "dueDate" ? "pm-sort-btn--active" : ""}`}
                            onClick={() => setSortBy("dueDate")}
                          >
                            Due date
                          </button>
                          <button
                            type="button"
                            className={`rest-btn pm-sort-btn ${sortBy === "priority" ? "pm-sort-btn--active" : ""}`}
                            onClick={() => setSortBy("priority")}
                          >
                            Priority
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default ProjectManagement