import "./Dashboard.css";
import Header from "./Header";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { useState, useEffect } from "react";
import {
  deleteTaskById,
  getTasks,
  updateTask,
  createTask,
} from "../services/taskService";

function Dashboard({ user, onLogout }) {
  const [selectedFilter, setSelectedFilter] = useState("todo");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();

        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const toggleComplete = async (id) => {
    try {
      const selectedTask = tasks.find((task) => task.id === id);

      const updatedTask = {
        ...selectedTask,
        completed: !selectedTask.completed,
      };

      await updateTask(updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDelete = async (id) => {
    try {
      await deleteTaskById(id);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (id) => {
    const task = tasks.find((task) => task.id === id);

    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData.id) {
        await updateTask(taskData);

        setTasks((prev) =>
          prev.map((task) => (task.id === taskData.id ? taskData : task)),
        );
      } else {
        const newTask = await createTask(taskData);

        setTasks((prev) => [...prev, newTask]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const today = new Date();
  const todoTasks = tasks.filter((task) => !task.completed).length;
  const lateTasks = tasks.filter((task) => {
    return !task.completed && new Date(task.date) < today;
  }).length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const allTasks = tasks.length;

  const filteredTasks = tasks.filter((task) => {
    switch (selectedFilter) {
      case "todo":
        return !task.completed;
      case "late":
        return !task.completed && new Date(task.date) < today;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <>
      <Header user={user} onLogout={onLogout} onAddTask={handleAddTask} />
      <div className="dashboard">
        <div className="stats-container">
          <div
            className={`stat-card todo ${
              selectedFilter === "todo" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("todo")}
          >
            <h3>Do wykonania</h3>
            <p>{todoTasks}</p>
          </div>

          <div
            className={`stat-card late ${
              selectedFilter === "late" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("late")}
          >
            <h3>Spóźnione</h3>
            <p>{lateTasks}</p>
          </div>

          <div
            className={`stat-card done ${
              selectedFilter === "completed" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("completed")}
          >
            <h3>Wykonane</h3>
            <p>{completedTasks}</p>
          </div>

          <div
            className={`stat-card all ${
              selectedFilter === "all" ? "active" : ""
            }`}
            onClick={() => setSelectedFilter("all")}
          >
            <h3>Wszystkie zadania</h3>
            <p>{allTasks}</p>
          </div>
        </div>

        <div className="tasks-container">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={toggleComplete}
              onEdit={handleEditTask}
              onDelete={toggleDelete}
            />
          ))}
        </div>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </>
  );
}

export default Dashboard;
