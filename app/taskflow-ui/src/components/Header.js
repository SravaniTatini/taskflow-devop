export default function Header({ dark, setDark }) {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md rounded-b-xl">

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        TaskFlow
      </h1>

      {/* DARK MODE TOGGLE */}
      <button
        onClick={() => setDark(!dark)}
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105 transition"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

    </header>
  );
}