import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ABOUT_ME } from "../../graphql/lab";

const About = () => {
  const [aboutMe, setAboutMe] = useState([]);

  const { data } = useQuery(ABOUT_ME);

  useEffect(() => {
    if (data) {
      setAboutMe(_.groupBy(data.aboutMe, "category"));
    }
  }, [data]);

  return (
    <div style={{ lineHeight: 1.6 }}>
      {Object.keys(aboutMe).map(function (category) {
        return (
          <div key={category}>
            <h3>{category}</h3>
            <ul>
              {aboutMe[category].map((item) => (
                <li key={item.id} dangerouslySetInnerHTML={{ __html: item.content }} />
              ))}
            </ul>
          </div>
        );
      })}
      <div>
        <h3>其他</h3>
        <ul>
          <li>
            <Link to="/self-talk">🤔自言自语</Link>
          </li>
          <li>
            <Link to="/cars">🚗车车</Link>
          </li>
          <li>
            <Link to="/like">💗喜欢的</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
