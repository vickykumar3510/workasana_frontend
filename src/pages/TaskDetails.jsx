import '../App.css'
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import { toast } from "react-toastify";
import TaskContext from "../contexts/TaskContext"
import TeamContext from '../contexts/TeamContext'
import TagContext from '../contexts/TagContext'
import OwnerContext from '../contexts/OwnerContext'
import ProjectContext from '../contexts/ProjectContext'
import Sidebar from "../components/Sidebar";

const TaskDetails = () => {
    const { teams } = useContext(TeamContext)
    const { tags } = useContext(TagContext)
    const { owners: allOwners } = useContext(OwnerContext)
    const { projects } = useContext(ProjectContext)

    const { taskId } = useParams()
    const { tasks, loading, updateTaskStatus } = useContext(TaskContext)

    const calculateDueDate = (timeToComplete) => {
        const today = new Date()
        const dueDate = new Date(today)
        dueDate.setDate(today.getDate() + Number(timeToComplete))
        return dueDate
    }

    const calculateRemainingDays = (dueDate) => {
        const today = new Date()
        const diffTime = dueDate - today
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0)
    }

    // Show loader while tasks (or context data) are loading
    if (loading || !tasks.length) {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        )
    }

    const task = tasks.find(t => t._id === taskId)
    if (!task) return <p className="task-details-not-found">Task not found.</p>

    const dueDate = calculateDueDate(task.timeToComplete)
    const remainingDays = calculateRemainingDays(dueDate)

    const markAsCompleted = () => {
        updateTaskStatus(taskId, "Completed")
        toast.success("Task marked as Completed");
    }

    return (
        <div className="task-details-bg">
            <h1 className='page-title'>
                Task: <span className="task-details-title-accent">{task.name}</span>
            </h1>

            <main className='container'>
                <div className="flexBoxes">
                    <Sidebar />

                    <div className="contentArea task-details-content">
                        <article className="task-details-card" aria-labelledby="task-details-heading">
                            <header className="task-details-card-header">
                                <h3 id="task-details-heading">Task Details</h3>
                                <span
                                    className={
                                        task.status === "Completed"
                                            ? "task-details-status-badge task-details-status-badge--completed"
                                            : "task-details-status-badge task-details-status-badge--active"
                                    }
                                >
                                    {task.status}
                                </span>
                            </header>

                            <dl className="task-details-dl">
                                <div className="task-details-row">
                                    <dt>Name</dt>
                                    <dd className="task-details-name">{task.name}</dd>
                                </div>
                                <div className="task-details-row">
                                    <dt>Project</dt>
                                    <dd>
                                        {projects.length
                                            ? typeof task.project === "object"
                                                ? task.project.name
                                                : projects.find(p => p._id === task.project)?.name
                                            : "Loading..."}
                                    </dd>
                                </div>
                                <div className="task-details-row">
                                    <dt>Team</dt>
                                    <dd>
                                        {teams.length
                                            ? typeof task.team === "object"
                                                ? task.team.name
                                                : teams.find(t => t._id === task.team)?.name
                                            : "Loading..."}
                                    </dd>
                                </div>
                                <div className="task-details-row">
                                    <dt>Owners</dt>
                                    <dd>
                                        {Array.isArray(task.owners)
                                            ? task.owners
                                                .map(o =>
                                                    typeof o === "object"
                                                        ? o.name
                                                        : allOwners.find(owner => owner._id === o)?.name
                                                )
                                                .filter(Boolean)
                                                .join(", ")
                                            : "—"}
                                    </dd>
                                </div>
                                <div className="task-details-row">
                                    <dt>Tags</dt>
                                    <dd>
                                        {Array.isArray(task.tags)
                                            ? task.tags
                                                .map(tagId => tags.find(tag => tag._id === tagId)?.name)
                                                .filter(Boolean)
                                                .join(", ")
                                            : "—"}
                                    </dd>
                                </div>
                                <div className="task-details-row">
                                    <dt>Priority</dt>
                                    <dd>{task.priority || "Medium"}</dd>
                                </div>
                                <div className="task-details-row">
                                    <dt>Due date</dt>
                                    <dd>{dueDate.toLocaleDateString()}</dd>
                                </div>
                            </dl>

                            <div className="task-details-reminder">
                                <span className="task-details-reminder-label">Time remaining</span>
                                <span className="task-details-reminder-value">
                                    {remainingDays} day{remainingDays !== 1 && "s"}
                                </span>
                            </div>

                            <footer className="task-details-actions">
                                <Link
                                    to={`/edittaskform/${taskId}`}
                                    className="removeLine forALine rest-btn task-details-action-btn"
                                >
                                    Edit Task
                                </Link>
                                <button
                                    type="button"
                                    className={`rest-btn task-details-action-btn ${task.status === "Completed" ? "task-details-action-btn--done" : ""}`}
                                    onClick={markAsCompleted}
                                >
                                    {task.status === "Completed"
                                        ? "Completed"
                                        : "Mark as Completed"}
                                </button>
                            </footer>
                        </article>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default TaskDetails