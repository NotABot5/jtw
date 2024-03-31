"use client";

export default function TextFileUpload({ setValue }) {
  return (
    <>
      <input
        type="file"
        onChange={async (e) => {
          let a = new FileReader();
          a.onload = async (ev) => {
            const text = ev.target.result;
            setValue(text);
          };
          a.readAsText(e.target.files[0]);
        }}
        className="block m-2"
      />
    </>
  );
}
