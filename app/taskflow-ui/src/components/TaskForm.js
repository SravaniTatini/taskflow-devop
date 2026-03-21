import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    addTask(title, desc, priority, dueDate);

    setTitle("");
    setDesc("");
    setPriority("MEDIUM");
    setDueDate("");
  };

  return (
    <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-white/30 transition hover:shadow-2xl hover:scale-[1.01]">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Add Task
      </h2>

      <div className="flex flex-col gap-3">

        {/* TITLE */}
        <input
          className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <input
          className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/* PRIORITY */}
        <select
          className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
        </select>

        {/* DUE DATE */}
        <input
          type="date"
          className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          Add Task
        </button>

      </div>
    </div>
  );
}