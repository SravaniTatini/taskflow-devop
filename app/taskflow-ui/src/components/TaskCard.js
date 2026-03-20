export default function TaskCard({ task, toggleTask, deleteTask }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between items-center transition transform hover:scale-[1.02]">
      
      <div>
        <h3
          className={`text-lg font-semibold ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-800 dark:text-white"
          }`}
        >
          {task.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {task.desc}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => toggleTask(task.id)}
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition"
        >
          ✓
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}