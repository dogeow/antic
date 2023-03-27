import "../styles/404.css";

import React from "react";
import { Link } from "react-router-dom";

import { CDN_URL } from "../config/services";

const NotFoundPage = () => {
  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="central-body">
          <img className="image-404" src={`${CDN_URL}/404/404.svg`} width="300px" />
          <a href="#" className="btn-go-home" target="_blank">
            <Link to="/">返回主页</Link>
          </a>
        </div>
        <div className="objects">
          <img className="object_rocket" src={`${CDN_URL}/404/rocket.svg`} width="40px" />
          <div className="earth-moon">
            <img className="object_moon" src={`${CDN_URL}/404/moon.svg`} width="80px" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" src={`${CDN_URL}/404/astronaut.svg`} width="140px" />
          </div>
          <div className="earth-moon">
            <img className="object_earth" src={`${CDN_URL}/404/earth.png`} width="100px" />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
