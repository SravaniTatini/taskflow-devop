import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [dark, setDark] = useState(false);

  const addTask = (title, desc) => {
    setTasks([
      ...tasks,
      { id: Date.now(), title, desc, completed: false },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">

        <Header dark={dark} setDark={setDark} />

        <main className="max-w-3xl mx-auto mt-10 px-4">
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </main>

      </div>
    </div>
  );
}