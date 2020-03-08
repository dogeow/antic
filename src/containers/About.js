import React, { useState, useEffect } from 'react'
import axios from 'axios'

const About = () => {
  const [aboutMe, setAboutMe] = useState([]);

  useEffect(() => {
    axios.get('about_me')
      .then(response => {
        setAboutMe(response.data);
      })
  }, []);

  return (
    <div>
      {
        aboutMe.map((item, index) => (
          <div>
            <div>{item.category}</div>
            <div key={index}>
              <ul>
                {
                  item.list.map((subItem, index) => (
                    <li key={index} dangerouslySetInnerHTML={{__html: subItem.content}}/>
                  ))
                }
              </ul>
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default About;
