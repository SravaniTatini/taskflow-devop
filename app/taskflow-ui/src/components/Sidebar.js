export default function Sidebar({ view, setView }) {
  const menu = [
    { name: "board", label: "📋 Board" },
    { name: "tasks", label: "📝 Tasks" },
    { name: "analytics", label: "📊 Analytics" },
    { name: "settings", label: "⚙️ Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg p-5 flex flex-col border-r border-gray-200 dark:border-gray-700">

      <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        TaskFlow
      </h1>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <button
            key={item.name}
            onClick={() => setView(item.name)}
            className={`text-left px-4 py-2 rounded-lg transition ${
              view === item.name
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto text-sm text-gray-500 dark:text-gray-400">
        © TaskFlow
      </div>

    </div>
  );
}