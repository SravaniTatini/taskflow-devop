import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Add Task
      </h2>

      <div className="flex flex-col gap-3">
        <input
          className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

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