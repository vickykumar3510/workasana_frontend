import { createContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("https://major-project-3-backend.vercel.app/tasks");
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);

    } catch (error) {
      console.log(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  //add task

const addTask = async (taskData) => {
  try {
    setLoading(true);

    await fetch("https://major-project-3-backend.vercel.app/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    await fetchTasks();
  } catch (error) {
    console.log("Add task failed:", error);
  } finally {
    setLoading(false);
  }
};

  // UPDATE TASK
  const updateTask = async (taskId, taskData) => {
    try {
      const res = await fetch(`https://major-project-3-backend.vercel.app/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const updatedTask = await res.json();

      setTasks(prev =>
        prev.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("Update task failed:", error);
    }
  };

  // UPDATE TASK STATUS
  const updateTaskStatus = async (taskId, status) => {
    try {
      const res = await fetch(`https://major-project-3-backend.vercel.app/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const updatedTask = await res.json();

    
      setTasks(prev =>
        prev.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ loading, tasks, updateTaskStatus, updateTask, addTask, setTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
