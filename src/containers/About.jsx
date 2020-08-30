import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
  const [aboutMe, setAboutMe] = useState([]);

  useEffect(() => {
    axios.get("about_me").then(({ data }) => {
      setAboutMe(data);
    });
  }, []);

  return (
    <>
      {aboutMe.map((item) => (
        <div key={item.category}>
          <h3>{item.category}</h3>
          <ul>
            {item.list.map((subItem) => (
              <li
                key={subItem.id}
                dangerouslySetInnerHTML={{ __html: subItem.content }}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default About;
