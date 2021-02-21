import "../styles/project.css";

import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

import projects from "../config/projects.json";

const useStyles = makeStyles(() => ({
  bg: {
    position: "fixed",
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    transition: "opacity 700ms",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${process.env.REACT_APP_API_URL}/random)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    opacity: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.bg} />
      <div className="top">233</div>
      <div className="name">小李世界</div>
      <div className="project">
        {projects.map((project, index) => (
          <a className="md-tile" href={project.link} key={index}>
            <div className="md-tile-inner">
              <img
                className="md-icon"
                width="40"
                alt={project.title}
                src={project.image}
              />
              <div className="md-title" style={{ direction: "ltr" }}>
                <span>{project.title}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div id="custom-bg-attr" className="attr-link">
        滑稽实验室
      </div>
    </div>
  );
}

export default App;
