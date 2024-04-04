"use client";
export default function Input({
  children,
  value,
  setValue,
  id,
  placeholder = "",
}) {
  return (
    <fieldset className="my-4 mx-2 flex items-center justify-center gap-5">
      <label htmlFor={id} className=" text-primary w-1/3 font-medium">
        {children}
      </label>
      <input
        id={id}
        className="p-1 m-1 rounded border border-secondary bg-background w-2/3 text-primary"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder={placeholder}
      />
    </fieldset>
  );
}
