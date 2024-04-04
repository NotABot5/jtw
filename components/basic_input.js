"use client";
export default function BasicInput({ value, setValue, placeholder = "" }) {
  return (
    <fieldset className="my-4 mx-2 flex items-center justify-center gap-5">
      <input
        autoFocus
        className="p-1 m-1 rounded border border-secondary w-full bg-background text-primary"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder={placeholder}
      />
    </fieldset>
  );
}
