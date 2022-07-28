import React, { useEffect, useState } from "react";
import { CodeEditor } from "../../components/CodeEditor/CodeEditor";
import SplitPane from "react-split-pane";
import Pane from "react-split-pane/lib/Pane";
import * as io from "socket.io-client";
import "./PlaygroundPage.css";
import { Emulator } from "../../components/Emulator/Emulator";

const socket = io("http://localhost:9092", { reconnection: false });

export const PlaygroundPage = () => {
  //   const [delayedCodes, setDelayedCodes] = useState("");

  // const [values, setValues] = useState({
  //   html: '<h1 style="color:white;" onclick="myFunction()">Hello! Change Me</h1>',
  //   css: "body{background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 41%, rgba(0,212,255,1) 100%); text-align:center;}",
  //   js: "function myFunction() { alert(1)}",
  // });

  const [html, setHtml] = useState(
    '<h1 style="color:white;" onclick="myFunction()">Hello! Change Me</h1>'
  );
  const [css, setCss] = useState(
    "body{background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 41%, rgba(0,212,255,1) 100%); text-align:center;}"
  );
  const [js, setJs] = useState("function myFunction() { alert(1)}");

  const onHtmlChange = (value) => {
    // setValues({ ...values, html: value });
    setHtml(value);
    socket.emit("document_write", {
      data: value,
      type: "HTML",
    });
  };

  const onCssChange = (value) => {
    //setValues({ ...values, css: value });
    setCss(value);
    socket.emit("document_write", {
      data: value,
      type: "CSS",
    });
  };

  const onJsChange = (value) => {
    // setValues({ ...values, js: value });
    setJs(value);
    socket.emit("document_write", {
      data: value,
      type: "JS",
    });
  };

  useEffect(() => {
    if (socket == null) return;
    const document_handler = ({ data, type }) => {
      // setValues({ ...values, [type.toLowerCase()]: data });
      switch (type) {
        case "HTML":
          setHtml(data);
          //setValues({ ...values, html: data });
          break;
        case "CSS":
          setCss(data);
          // setValues({ ...values, css: data });
          break;
        case "JS":
          setJs(data);
          // setValues({ ...values, js: data });
          break;
      }
    };

    socket.on("document_read", document_handler);

    return () => {
      socket.off("document_read", document_handler);
    };
  }, [socket]);

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       setDelayedCodes(`
  //           <html>
  //             <body>${html}</body>
  //             <style>${css}</style>
  //             <script>${js}</script>
  //           </html>
  //         `);
  //     }, 250);

  //     return () => clearTimeout(timeout);
  //   }, [html, css, js]);

  return (
    <div className="playground">
      <SplitPane split="vertical">
        <Pane initialSize="34%" minSize="15%">
          <CodeEditor
            name="HTML"
            lang="xml"
            value={html}
            handleChange={onHtmlChange}
          />
        </Pane>
        <Pane initialSize="33%" minSize="15%">
          <CodeEditor
            name="CSS"
            lang="css"
            value={css}
            handleChange={onCssChange}
          />
        </Pane>
        <Pane initialSize="33%" minSize="15%">
          <CodeEditor
            name="JS"
            lang="javascript"
            value={js}
            handleChange={onJsChange}
          />
        </Pane>
      </SplitPane>

      <Emulator values={{ html, css, js }} />
    </div>
  );
};
