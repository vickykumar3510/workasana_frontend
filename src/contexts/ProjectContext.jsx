import { createContext, useEffect, useState } from "react"

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    try {
      const res = await fetch("https://major-project-3-backend.vercel.app/projects")
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.log("Error while fetching projects", error)
    } finally {
      setLoading(false)
    }
  }

  const addProject = async (projectData) => {
  try {
    const res = await fetch("https://major-project-3-backend.vercel.app/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData)
    })

    if (!res.ok) {
      throw new Error("Failed to add project")
    }

    const result = await res.json()

    const newProject = result.project || result

    setProjects((prev) => [...prev, newProject])

    return newProject
  } catch (error) {
    console.log("Error while adding project", error)
    throw error
  }
}


  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <ProjectContext.Provider value={{ loading, projects, addProject, setProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContext
