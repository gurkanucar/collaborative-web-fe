import React, { useEffect, useState } from "react";
import { Emulator } from "../../components/Emulator/Emulator";
import { TextEditor } from "../../components/TextEditor/TextEditor";

import "./CodePage.css";

export const CodePage = () => {
  const [editors, setEditors] = useState({
    html: undefined,
    css: undefined,
    js: undefined,
  });

  const handleHtml = (delta, oldDelta, source) => {
    console.log("html", delta);
  };

  const handleCss = (delta, oldDelta, source) => {
    console.log("css", delta);
  };

  const handleJS = (delta, oldDelta, source) => {
    console.log("js", delta);
  };

  // useEffect(() => {
  //   if (editors.html == undefined) return;
  //   const interval = setInterval(() => {
  //     editors.html.updateContents({
  //       ops: [
  //         {
  //           insert: "selammm!",
  //         },
  //       ],
  //     });
  //   }, 1500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [editors]);

  return (
    <div className="code-page">
      <div className="code-page-editors">
        <TextEditor
          editors={editors}
          setEditors={setEditors}
          handler={handleHtml}
          type={"html"}
        />
        <TextEditor
          editors={editors}
          setEditors={setEditors}
          handler={handleCss}
          type={"css"}
        />
        <TextEditor
          editors={editors}
          setEditors={setEditors}
          handler={handleJS}
          type={"js"}
        />
      </div>
      <div>
        <Emulator />
      </div>
    </div>
  );
};
