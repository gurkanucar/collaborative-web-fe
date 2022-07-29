import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components/Button/Button";
import { InputComponent } from "../../components/InputComponent/InputComponent";

import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const [projectID, setProjectID] = useState("");

  const createNewProject = () => {
    navigate("/project/" + uuidv4());
  };

  const openProject = (e) => {
    if (projectID == "") return;
    navigate("/project/" + projectID);
  };

  return (
    <div className="home_root">
      <div className="home">
        <span className="home_title">Collaborative HTML-CSS-JS Editor</span>
        <br />
        <Button text={"Create New"} onClick={createNewProject} />
        <h3>OR</h3>
        <div className="home_open_project">
          <InputComponent
            onChange={(e) => setProjectID(e.target.value)}
            value={projectID}
            placeholder="project id"
          />
          <Button text={"Open Project"} onClick={openProject} />
        </div>
      </div>
    </div>
  );
};
