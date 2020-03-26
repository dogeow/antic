import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  quote: {
    border: '10px solid transparent',
    padding: 15,
    marginBottom: 5,
    borderImage: 'url(/images/border.png) 30 stretch',
    listStyle: 'none',
  },
}));

const SelfTalk = () => {
  const classes = useStyles();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get('quotes').then(response => {
      setQuotes(response.data);
    });
  }, []);

  return (
    <ul style={{paddingInlineStart: 10}}>
      {
        quotes.map((quote, i) =>
          <li key={i} className={classes.quote}>{quote.content}</li>,
        )
      }
    </ul>
  );
};

export default SelfTalk;
