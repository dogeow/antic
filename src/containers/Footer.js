import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import GitHub from '@material-ui/icons/GitHub'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const Footer = () => (
  <Container component="footer" className="main-footer" style={{marginTop: 20}}>
    <Grid container spacing={0}>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" component="h3">
          Powered by
        </Typography>
        <ul>
          <li><a href="https://zh-hans.reactjs.org/" target="_blank" rel="noopener noreferrer">React</a></li>
          <li><a href="https://material-ui.com/zh/" target="_blank" rel="noopener noreferrer">Material-UI</a></li>
          <li><a href="https://laravel.com" target="_blank" rel="noopener noreferrer">Laravel</a></li>
        </ul>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" component="h3">
          Build by
        </Typography>
        <Typography>小李世界 with <span role="img" aria-label="❤">❤️</span></Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" component="h3">
          Follow me in
        </Typography>
        <Typography>
          <Link href="https://github.com/likunyan/react" target="_blank" rel="noopener noreferrer"><GitHub/></Link>
        </Typography>
      </Grid>
    </Grid>
  </Container>
);

export default Footer;
