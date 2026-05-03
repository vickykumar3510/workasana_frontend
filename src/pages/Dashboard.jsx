import '../App.css'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

import ProjectContext from '../contexts/ProjectContext'
import TaskContext from '../contexts/TaskContext'
import TagContext from '../contexts/TagContext'
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate()

    const { tags } = useContext(TagContext)
    const { projects, loading } = useContext(ProjectContext)
    const { tasks } = useContext(TaskContext)

    const [taskFilter, setTaskFilter] = useState("All")

    const filteredTasks = taskFilter === "All" ? tasks : tasks.filter(task => task.status === taskFilter)
    
    const logout = () => {
        localStorage.clear()
        navigate('/', { replace: true })
        toast.success("Logout successfully.");
    }

    return (
        <div className='dashboard-bg'>
            <h1 className='page-title'>Dashboard</h1>
            <main className='container'>
                {loading && (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                )}

                <div className='flexBoxes'>
                    <Sidebar logout={logout} />

                    <div className='contentArea pm-content'>
                        <h3>Projects</h3>
                        <div>
                            <button className='form-Btn'>
                                <Link className='removeLine line-txt' to="/newprojectform">Add new Project</Link>
                            </button>

                            <ul>
                                {projects.map((project) => (
                                    <li key={project._id} className='rowBox'>
                                        <Link className='project-name removeLine' to={`/projectmanagement/${project._id}`}>
                                            {project.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h3 style={{ marginTop: "50px" }}>My Tasks</h3>
                        <div>
                            <button className='form-Btn'>
                                <Link className='removeLine line-txt' to="/newtaskform">Add new Task</Link>
                            </button>

                            <ul>
                                {filteredTasks.map(task => (
                                    <li className='taskRowBox' key={task._id}>
                                        <div className="taskRowBox-body">
                                            <Link
                                                className='task-name taskRowBox-title removeLine'
                                                to={`/taskdetails/${task._id}`}
                                            >
                                                {task.name}
                                            </Link>
                                            <div className="taskRowBox-meta">
                                                <div className="taskRowBox-field">
                                                    <span className="taskRowBox-kicker">Owners</span>
                                                    <span className='miniBox'>
                                                        {task.owners.map(o => o.name).join(", ")}
                                                    </span>
                                                </div>
                                                <div className="taskRowBox-field">
                                                    <span className="taskRowBox-kicker">Status</span>
                                                    <span className="taskStatusPill">{task.status}</span>
                                                </div>
                                                {Array.isArray(task.tags) && task.tags.length > 0 && (
                                                    <div className="taskRowBox-field">
                                                        <span className="taskRowBox-kicker">Tags</span>
                                                        <div className="taskRowBox-tags">
                                                            {task.tags.map((tagId) => {
                                                                const tagName = tags.find((t) => t._id === tagId)?.name
                                                                return tagName ? (
                                                                    <span key={tagId} className="taskTagChip">{tagName}</span>
                                                                ) : null
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h3 style={{ marginTop: "50px" }}>Quick Filters</h3>
                        <button className='rest-btn' onClick={() => setTaskFilter("All")}>All Status</button>{" "}
                        <button className='rest-btn' onClick={() => setTaskFilter("In Progress")}>In Progress</button>{" "}
                        <button className='rest-btn' onClick={() => setTaskFilter("Completed")}>Completed</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard