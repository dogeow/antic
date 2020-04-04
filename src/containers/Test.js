import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';

const Test = () => {
  return (
    <>
      {
        [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <div>
            <Link to="#a">Link to Hash
              Fragment</Link>
          </div>
        ))
      }
      <div id="a">233</div>
    </>
  );
};

export default Test;
