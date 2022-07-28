import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import "./TextEditor.css";

export const TextEditor = (props) => {
  const { type, handleChanges, editors, setEditors } = props;


  useEffect(() => {
    if (editors[type] == undefined) return;
    editors[type].on("text-change", handleChanges);
    return () => {
      editors[type].off("text-change", handleChanges);
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
    q.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = [];
      delta.ops.forEach((op) => {
        if (op.insert && typeof op.insert === "string") {
          ops.push({
            insert: op.insert,
          });
        }
      });
      delta.ops = ops;
      return delta;
    });
    q.format("size", "36px");
    //q.disable();
    //q.setText("Loading...");
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
