"use client";
export default function Input({
  children,
  value,
  setValue,
  id,
  placeholder = "",
}) {
  return (
    <fieldset className="m-4 flex items-center gap-5">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder={placeholder}
      />
    </fieldset>
  );
}
