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
      <ul>
        {
          aboutMe.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{__html: item.content}}/>
          ))
        }
      </ul>
    </div>
  )
};

export default About;
