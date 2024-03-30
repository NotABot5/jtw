"use client";
export default function Button({ children, onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="bg-cyan-800 text-white p-2 m-2 px-6 rounded hover:bg-cyan-700 transition-all"
    >
      {children}
    </button>
  );
}
