"use client";
export default function Button({
  children,
  onClick,
  ariaLabel,
  autoFocus = false,
}) {
  return (
    <>
      {autoFocus && (
        <button
          autoFocus
          onClick={onClick}
          aria-label={ariaLabel}
          className="bg-primary text-background p-2 m-2 px-6 rounded hover:bg-primary-light transition-all focus:shadow-primary-dark"
        >
          {children}
        </button>
      )}
      {!autoFocus && (
        <button
          onClick={onClick}
          aria-label={ariaLabel}
          className="bg-primary text-background p-2 m-2 px-6 rounded hover:bg-primary-light transition-all focus:shadow-primary-dark"
        >
          {children}
        </button>
      )}
    </>
  );
}
