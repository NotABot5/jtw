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
    <fieldset className="m-4 flex items-center gap-5">
      <label>{children}</label>
      {value.map((prev, index) => {
        return (
          <div key={crypto.randomUUID()}>
            <input
              value={prev}
              onChange={(event) => handleChange(index, event)}
            />
            <button onClick={() => remove(index)}>-</button>
          </div>
        );
      })}
      <button onClick={() => add()}>+</button>
    </fieldset>
  );
}
