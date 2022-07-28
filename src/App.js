import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { PlaygroundPage } from "./pages/PlaygroundPage/PlaygroundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="project" element={<PlaygroundPage />}>
          <Route path=":projectID" element={<PlaygroundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
