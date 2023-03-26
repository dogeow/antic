import "../styles/404.css";

import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="central-body">
          <img className="image-404" src="/images/404/404.svg" width="300px" />
          <a href="#" className="btn-go-home" target="_blank">
            <Link to="/">返回主页</Link>
          </a>
        </div>
        <div className="objects">
          <img className="object_rocket" src="/images/404/rocket.svg" width="40px" />
          <div className="earth-moon">
            <img className="object_moon" src="/images/404/moon.svg" width="80px" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" src="/images/404/astronaut.svg" width="140px" />
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
