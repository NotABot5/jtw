"use client";
export default function RedButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white p-2 m-2 px-6 rounded hover:bg-red-400 transition-all focus:shadow-red-800 "
      autoFocus
    >
      {children}
    </button>
  );
}
