import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import * as React, { useEffect, useState } from "react";

const ABOUT_ME = gql`
  query {
    aboutMe {
      id
      content
      category
    }
  }
`;

const About = () => {
  const [aboutMe, setAboutMe] = useState([]);

  const { data } = useQuery(ABOUT_ME);

  useEffect(() => {
    if (data) {
      setAboutMe(_.groupBy(data.aboutMe, "category"));
    }
  }, [data]);

  return (
    <>
      {Object.keys(aboutMe).map(function (category) {
        return (
          <div key={category}>
            <h3>{category}</h3>
            <ul>
              {aboutMe[category].map((item) => (
                <li
                  key={item.id}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default About;
