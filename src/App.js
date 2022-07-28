import logo from "./logo.svg";
import "./App.css";
import { TextEditor } from "./components/TextEditor/TextEditor";
import { CodePage } from "./pages/CodePage/CodePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="project" element={<CodePage />}>
          <Route path=":projectID" element={<CodePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
