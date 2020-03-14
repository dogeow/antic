import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SelfTalk = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get('quotes').then(response => {
      setQuotes(response.data);
    })
  }, []);

  return (
    <ul style={{paddingInlineStart: 10}}>
      {
        quotes.map((quote, index) => (
          <li key={index} className="quote" style={{margin: '5px 0'}}>{quote.content}</li>
        ))
      }
    </ul>
  );
};

export default SelfTalk;
