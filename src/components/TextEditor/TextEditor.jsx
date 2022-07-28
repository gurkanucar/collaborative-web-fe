import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import "./TextEditor.css";

// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["bold", "italic", "underline"],
//   [{ color: [] }, { background: [] }],
//   [{ script: "sub" }, { script: "super" }],
//   [{ align: [] }],
//   ["image", "blockquote", "code-block"],
//   ["clean"],
// ];

const TOOLBAR_OPTIONS = [];

export const TextEditor = (props) => {
  //   const [quill, setQuill] = useState();

  const { type, handler, editors, setEditors } = props;

  //   useEffect(() => {
  //     if (quill == null) return;

  //     const interval = setInterval(() => {
  //       quill.updateContents({
  //         ops: [
  //           {
  //             insert: "s",
  //           },
  //         ],
  //       });
  //     }, 1500);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [quill]);

  useEffect(() => {
    if (editors[type] == undefined) return;
    editors[type].on("text-change", handler);
    return () => {
      editors[type].off("text-change", handler);
    };
  }, [editors[type]]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: false },
    });
    q.format("size", "36px");
    // q.disable();
    // q.setText("Loading...");
    //setQuill(q);
    setEditors({ ...editors, ...(editors[type] = q) });
  }, []);

  return (
    <div className="text-editor-div">
      <span className="text-editor-title">{type}</span>
      <hr className="text-editor-divider" />
      <div className="text-editor" ref={wrapperRef}></div>
    </div>
  );
};
