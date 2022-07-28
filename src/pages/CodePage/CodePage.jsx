import React, { useEffect, useState } from "react";
import { Emulator } from "../../components/Emulator/Emulator";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import * as io from "socket.io-client";
import "./CodePage.css";

export const CodePage = (props) => {
  const [socket, setSocket] = useState();

  const [editors, setEditors] = useState({
    html: undefined,
    css: undefined,
    js: undefined,
  });

  // const [html, setHtml] = useState("");
  // const [css, setCss] = useState("");
  // const [js, setJs] = useState("");

  const [values, setValues] = useState({
    html: "",
    css: "qwe",
    js: "",
  });

  useEffect(() => {
    console.log("values:", values);
  }, [values]);

  useEffect(() => {
    const s = io("http://localhost:9092", { reconnection: false });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  const handleChangesHtml = (delta, oldDelta, source) => {
    if (source !== "user") return;
    socket.emit("document_write", {
      data: JSON.stringify(delta),
      type: "HTML",
    });
    // setHtml(editors.html.getText());
    setValues({ ...values, html: editors.html.getText() });
  };

  const handleChangesCss = (delta, oldDelta, source) => {
    if (source !== "user") return;
    socket.emit("document_write", {
      data: JSON.stringify(delta),
      type: "CSS",
    });
    setValues({ ...values, css: editors.css.getText() });
    // setCss(editors.css.getText());
  };

  const handleChangesJs = (delta, oldDelta, source) => {
    if (source !== "user") return;
    socket.emit("document_write", {
      data: JSON.stringify(delta),
      type: "JS",
    });
    // setJs(editors.js.getText());
  };

  useEffect(() => {
    if (socket == null) return;
    const document_handler = ({ data, type }) => {
      switch (type) {
        case "HTML":
          editors.html.updateContents(JSON.parse(data));
          setValues({ ...values, html: editors.html.getText() });
          // setHtml(editors.html.getText());
          break;
        case "CSS":
          editors.css.updateContents(JSON.parse(data));
          setValues({ ...values, css: editors.css.getText() });
          // setCss(editors.css.getText());
          break;
        case "JS":
          editors.js.updateContents(JSON.parse(data));
          // setJs(editors.js.getText());
          break;
      }
    };

    socket.on("document_read", document_handler);

    return () => {
      socket.off("document_read", document_handler);
    };
  }, [socket]);

  return (
    <div className="code-page">
      <div className="code-page-editors">
        <TextEditor
          editors={editors}
          setEditors={setEditors}
          handleChanges={handleChangesHtml}
          type={"html"}
        />
        <TextEditor
          editors={editors}
          setEditors={setEditors}
          handleChanges={handleChangesCss}
          type={"css"}
        />
        <TextEditor
          editors={editors}
          setEditors={setEditors}
          handleChanges={handleChangesJs}
          type={"js"}
        />
      </div>
      <div>
        <Emulator
          // html={autoRun ? html : ""}
          html={values.html}
          css={values.css}
          js={values.js}
        />
      </div>
    </div>
  );
};
