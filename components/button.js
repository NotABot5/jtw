"use client";
export default function Button({ children, onClick, ariaLabel }) {
  return (
    <button onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
