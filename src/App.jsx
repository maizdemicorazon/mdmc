import React, { useEffect } from "react";
import Publicidad from "./pages/Publicidad";

function App() {
  // Manejo de tema
  const [dark, setDark] = React.useState(() => {
    // Inicializa según sistema o localStorage
    const ls = localStorage.getItem("theme");
    if (ls) return ls === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen">
      <Publicidad />
      {/* Botón de cambio de tema */}
      <button
        className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-yellow-400 dark:bg-zinc-800 text-yellow-900 dark:text-yellow-100 shadow-xl border border-yellow-500 dark:border-zinc-700 transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Cambiar tema claro/oscuro"
        onClick={() => setDark((v) => !v)}
      >
        {dark ? (
          // Sol
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          // Luna
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 0112.21 3a7 7 0 000 14 9 9 0 008.79-4.21z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default App;