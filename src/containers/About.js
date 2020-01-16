import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
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
    <Grid container spacing={2}>
      <Grid item>
        <ul style={{paddingInlineStart: 'inherit'}}>
          {
            aboutMe.map((about, index) => (
              <li key={index} dangerouslySetInnerHTML={{__html: about.content}}/>
            ))
          }
        </ul>
      </Grid>
    </Grid>
  )
};

export default About;
