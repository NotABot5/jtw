"use client";
export default function MultiInput({ children, value, setValue }) {
  const handleChange = (index, event) => {
    setValue((prev) => {
      let data = [...prev];
      data[index] = event.target.value;
      return data;
    });
  };
  const add = () => {
    setValue((prev) => {
      let data = [...prev];
      data.push("");
      return data;
    });
  };
  const remove = (index) => {
    setValue((prev) => {
      let data = [...prev];
      data.splice(index, 1);
      return data;
    });
  };
  return (
    <fieldset className="m-2 w-full">
      <h2 className="mb-4 text-primary font-medium mx-auto text-start">
        {children}
      </h2>
      {value.map((prev, index) => {
        return (
          <div
            key={index}
            className="m-2 flex w-full items-center justify-start"
          >
            <input
              value={prev}
              onChange={(event) => handleChange(index, event)}
              className="p-1 mr-2 rounded border border-secondary w-5/6 bg-background text-primary"
            />
            <button
              className="justify-self-end rounded font-normal bg-background border border-secondary text-primary text-xl w-8 h-8 flex items-center justify-center hover:bg-secondary transition-all"
              onClick={() => remove(index)}
            >
              -
            </button>
          </div>
        );
      })}
      {value.length < 10 && (
        <button
          className="rounded font-normal bg-background border border-secondary text-primary text-xl ml-2 w-8 h-8 flex items-center justify-center hover:bg-secondary transition-all"
          onClick={() => add()}
        >
          +
        </button>
      )}
    </fieldset>
  );
}
