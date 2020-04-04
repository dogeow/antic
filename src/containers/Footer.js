import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Link as RouteLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    '@media (min-height: 777px)': {
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
      },
    },
    backgroundImage: theme.palette.type === 'dark'
      ? 'url(/images/tesla-vector-roadster-4.png)'
      : 'url(/images/tesla-transparent-care-5.png)',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 200,
    minHeight: 200,
    paddingTop: 20,
    marginTop: 20,
    borderTop: '1px dashed rgb(255,255,255, 0.3)',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container
      component="footer"
      className={classes.footer}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm>
          <Typography variant="h5" component="h3">
            Powered by
          </Typography>
          <ul>
            <li>
              <a
                href="https://zh-hans.reactjs.org/"
                target="_blank"
                rel="noopener noreferrer">
                React
              </a>
            </li>
            <li>
              <a
                href="https://material-ui.com/zh/"
                target="_blank"
                rel="noopener noreferrer">
                Material-UI
              </a>
            </li>
            <li>
              <a
                href=" https://laravel.com"
                target="_blank"
                rel="noopener noreferrer">
                Laravel
              </a>
            </li>
            <li>
              <RouteLink to={'/powered-by'}>More?</RouteLink>
            </li>
          </ul>
        </Grid>
      </Grid>
      <div style={{textAlign: 'center'}}>
        Built By 小李世界 with <span role="img" aria-label="❤">❤️</span>
      </div>
    </Container>
  );
};

export default Footer;
