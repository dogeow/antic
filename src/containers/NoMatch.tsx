import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";

import { CDN_URL } from "../config/services";

const starNumber = 150;
const randomPercentage = () => `${Math.floor(Math.random() * 100)}%`;

const getStarStyles = (numStars: number) => {
  const styles = {};

  for (let i = 1; i <= numStars; i++) {
    const animationDelay = `${Math.random() * 2}s`;
    const starStyles = {
      top: randomPercentage(),
      left: randomPercentage(),
      animation: `$glowStar 2s infinite ease-in-out alternate ${animationDelay}`,
    };
    Object.assign(styles, { [`& .star:nth-child(${i})`]: starStyles });
  }

  return styles;
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
  },
  btnGoHome: {
    color: "white",
    position: "relative",
    margin: "1rem auto",
    width: "8rem",
    padding: "0.8rem 0.8rem",
    border: "1px solid whitesmoke",
    borderRadius: "100px",
    display: "block",
    letterSpacing: "0.2rem",
    fontSize: "1rem",
    transition: "all 0.3s ease-in",
    "&:hover": {
      backgroundColor: "#0264a0",
      color: "#fff",
      transform: "scale(1.05)",
      boxShadow: "0 20px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  centralBody: {
    padding: "17% 5% 10% 5%",
    textAlign: "center",
  },
  objects: {
    img: {
      zIndex: 90,
      pointerEvents: "none",
    },
  },
  objectRocket: {
    position: "absolute",
    pointerEvents: "none",
    animation: "$rocketMovement 100s linear infinite both alternate",
  },
  objectMoon: {
    position: "absolute",
    top: "12%",
    left: "25%",
    pointerEvents: "none",
  },
  objectEarth: {
    position: "absolute",
    top: "70%",
    left: "40%",
    pointerEvents: "none",
  },
  objectAstronaut: {
    animation: "$rotateAstronaut 200s infinite linear both alternate",
  },
  boxAstronaut: {
    zIndex: "110 !important",
    position: "absolute",
    top: "60%",
    right: "20%",
    willChange: "transform",
    animation: "$moveAstronaut 50s infinite linear both alternate",
  },
  image404: {
    pointerEvents: "none",
  },
  stars: {
    backgroundSize: "contain",
    background: `url(${CDN_URL}/404/overlay_stars.svg) repeat left top`,
  },
  glowingStars: {
    "& .star": {
      position: "absolute",
      borderRadius: "100%",
      backgroundColor: "#9E9E9E",
      width: "3px",
      height: "3px",
      opacity: "0.1",
      willChange: "opacity",
    },
    ...getStarStyles(starNumber),
  },
  "@media only screen and (max-width: 600px)": {
    boxAstronaut: {
      top: "70%",
    },
    centralBody: {
      paddingTop: "25%",
    },
  },
  "@keyframes rocketMovement": {
    "100%": {
      transform: "translate(95vw, -95vw)",
    },
  },
  "@keyframes moveAstronaut": {
    "100%": {
      transform: "translate(-160px, -160px)",
    },
  },
  "@keyframes rotateAstronaut": {
    "100%": {
      transform: "rotate(-720deg)",
    },
  },
  "@keyframes glowStar": {
    "0%": {
      opacity: "0.3",
    },
    "100%": {
      opacity: "1",
    },
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.stars}>
        <div className={classes.centralBody}>
          <img className={classes.image404} src={`${CDN_URL}/404/404.svg`} width="300px" alt="404" />
          <Link to="/" className={classes.btnGoHome}>
            <Typography>返回主页</Typography>
          </Link>
        </div>
        <div className={classes.objects}>
          <img className={classes.objectRocket} src={`${CDN_URL}/404/rocket.svg`} width="40px" alt="Rocket" />
          <img className={classes.objectMoon} src={`${CDN_URL}/404/moon.svg`} width="80px" alt="Moon" />
          <div className={classes.boxAstronaut}>
            <img
              className={classes.objectAstronaut}
              src={`${CDN_URL}/404/astronaut.svg`}
              width="140px"
              alt="Astronaut"
            />
          </div>
          <img className={classes.objectEarth} src={`${CDN_URL}/404/earth.png`} width="100px" alt="Earth" />
        </div>
        <div className={classes.glowingStars}>
          {Array.from({ length: starNumber }).map((_, index) => (
            <div className="star" key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
