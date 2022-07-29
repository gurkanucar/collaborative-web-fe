import React, { useEffect, useState } from "react";
import { CodeEditor } from "../../components/CodeEditor/CodeEditor";
import SplitPane from "react-split-pane";
import Pane from "react-split-pane/lib/Pane";
import * as io from "socket.io-client";
import "./PlaygroundPage.css";
import { Emulator } from "../../components/Emulator/Emulator";
import { useParams } from "react-router-dom";

const SAVE_INTERVAL_MS = 2000;

//const socket = io("http://localhost:9092", { reconnection: false,query: "foo=bar"  });

export const PlaygroundPage = (props) => {
  //   const [delayedCodes, setDelayedCodes] = useState("");
  let { projectID } = useParams();

  const [html, setHtml] = useState("loading...");
  const [css, setCss] = useState("loading...");
  const [js, setJs] = useState("loading...");

  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io("http://localhost:9092", {
      reconnection: false,
      query: "room=" + projectID,
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [projectID]);

  useEffect(() => {
    if (projectID != undefined && socket != undefined) {
      socket.emit("document_get", {
        room: projectID,
      });
    }
  }, [projectID, socket]);

  useEffect(() => {
    if (
      socket == undefined ||
      html == "loading..." ||
      css == "loading..." ||
      js == "loading..."
    )
      return;

    const interval = setInterval(() => {
      socket.emit("document_save", {
        room: projectID,
        html: html,
        css: css,
        js: js,
      });
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, html, css, js]);

  const onHtmlChange = (value) => {
    // setValues({ ...values, html: value });
    setHtml(value);
    socket.emit("document_write", {
      data: value,
      room: projectID,
      type: "HTML",
    });
  };

  const onCssChange = (value) => {
    //setValues({ ...values, css: value });
    setCss(value);
    socket.emit("document_write", {
      data: value,
      room: projectID,
      type: "CSS",
    });
  };

  const onJsChange = (value) => {
    // setValues({ ...values, js: value });
    setJs(value);
    socket.emit("document_write", {
      data: value,
      room: projectID,
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

    const document_retreive = (data) => {
      const jsonData = JSON.parse(data);
      setHtml(jsonData.html);
      setCss(jsonData.css);
      setJs(jsonData.js);
    };

    socket.on("document_read", document_handler);
    socket.on("document_retrieved", document_retreive);

    return () => {
      socket.off("document_read", document_handler);
      socket.off("document_retrieved", document_retreive);
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
