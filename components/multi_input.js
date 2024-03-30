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
      <label className=" text-cyan-800 font-medium text-center mx-auto mb-4">
        {children}
      </label>
      {value.map((prev, index) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="m-2 flex w-full items-center justify-start"
          >
            <input
              value={prev}
              onChange={(event) => handleChange(index, event)}
              className="p-1 mr-2 rounded border border-slate-400 w-5/6 text-cyan-800 focus:border-cyan-800"
            />
            <button
              className="justify-self-end rounded font-normal bg-white border border-slate-400 text-cyan-800 text-xl w-8 h-8 flex items-center justify-center hover:bg-cyan-700 transition-all"
              onClick={() => remove(index)}
            >
              -
            </button>
          </div>
        );
      })}
      {value.length < 6 && (
        <button
          className="rounded font-normal bg-white border border-slate-400 text-cyan-800 text-xl ml-2 w-8 h-8 flex items-center justify-center hover:bg-cyan-700 transition-all"
          onClick={() => add()}
        >
          +
        </button>
      )}
    </fieldset>
  );
}
