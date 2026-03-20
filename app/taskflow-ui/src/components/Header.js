export default function Header({ dark, setDark }) {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        TaskFlow
      </h1>

      <button
        onClick={() => setDark(!dark)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}