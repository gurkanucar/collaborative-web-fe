import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    <div>
      <button onClick={createNewProject}>Create New</button>
      <div>
        <input
          onChange={(e) => setProjectID(e.target.value)}
          value={projectID}
          placeholder="project id"
        />
        <button onClick={openProject}>Open Project</button>
      </div>
    </div>
  );
};
