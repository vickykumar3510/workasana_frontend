import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { ProjectProvider } from './contexts/ProjectContext.jsx'
import { TaskProvider } from './contexts/TaskContext.jsx'
import NewProjectForm from './pages/NewProjectForm.jsx'
import NewTaskForm from './pages/NewTaskForm.jsx'
import EditTaskForm from './pages/EditTaskForm.jsx'
import { TeamProvider } from './contexts/TeamContext.jsx'
import { OwnerProvider } from './contexts/OwnerContext.jsx'
import { TagProvider } from './contexts/TagContext.jsx'
import ProjectManagement from './pages/ProjectManagement.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import TeamManagement from './pages/TeamManagement.jsx'
import NewTeamForm from './pages/NewTeamForm.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "./charts/ChartSetup.jsx";
import AllProjects from './pages/AllProjects.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signuppage",
    element: <SignUpPage/>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: "/newprojectform",
    element: <ProtectedRoute><NewProjectForm /></ProtectedRoute>
  },
  {
    path: "/newtaskform",
    element: <ProtectedRoute><NewTaskForm /></ProtectedRoute>
  },
  {
    path: "/edittaskform/:taskId",
    element: <ProtectedRoute><EditTaskForm /></ProtectedRoute>
  },
  {
    path: "/projectmanagement/:projectId",
    element: <ProtectedRoute><ProjectManagement /></ProtectedRoute>
  },
  {
    path: "/taskdetails/:taskId",
    element: <ProtectedRoute><TaskDetails /></ProtectedRoute>
  },
  {
    path: "/teammanagement",
    element: <ProtectedRoute><TeamManagement /></ProtectedRoute> 
  },
  {
    path: "/newteamform",
    element: <ProtectedRoute><NewTeamForm /></ProtectedRoute>
  },
  {
    path: "/reports",
    element: <ProtectedRoute><Reports /></ProtectedRoute>
  },
  {
    path: "/settings",
    element: <ProtectedRoute><Settings /></ProtectedRoute>
  },
  {
    path: "/allprojects",
    element: <ProtectedRoute><AllProjects /></ProtectedRoute>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TagProvider>
    <OwnerProvider>
    <TeamProvider>
    <TaskProvider>
    <ProjectProvider>
      <ToastContainer position="top-right" autoClose={2000} />
    <RouterProvider router={router} /> 
    </ProjectProvider>
    </TaskProvider>
    </TeamProvider>
    </OwnerProvider>
    </TagProvider>
  </StrictMode>
)
