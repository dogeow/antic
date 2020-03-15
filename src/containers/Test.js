import React, { useEffect } from 'react';
import axios from 'axios'

const Test = () => {
  useEffect(() => {
    axios.post('http://api.heclouds.com/devices/23232/lbs/latestLocation', {
      headers: {
        'User-Agent': '2333',
        'api-key': '2w4*****y5Y=',
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (<>233</>);
};

export default Test
