import React, { useEffect, useState } from "react";
import { getTasks, createTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title || !description) return;

    await createTask({
      title,
      description,
      status: "OPEN"
    });

    setTitle("");
    setDescription("");
    loadTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>TaskFlow</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <b>{task.title}</b> - {task.description} [{task.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;