import React, { useEffect, useState } from "react";
import "./Emulator.css";
export const Emulator = () => {
  const [srcDoc, setSrcDoc] = useState("");


  const html = "<h1>Selam!</h1><br/><h1>Selam!</h1><br/><h1>Selam!</h1><br/><h1>Selam!</h1><br/><h1>Selam!</h1><br/>";
  const css = "";
  const js = "";

  useEffect(() => {

    const timeout = setTimeout(() => {
      setSrcDoc(`
            <html>
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>
          `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};