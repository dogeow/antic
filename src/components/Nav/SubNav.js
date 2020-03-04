import React from 'react'
import Grid from '@material-ui/core/Grid'
import Menu from './Menu'
import Typography from '@material-ui/core/Typography'

const SubNav = (props) => (
  <Grid container spacing={2}>
    <Grid container spacing={2} style={{marginBottom: 20}}>
      {props.data.map((menu, index) => (
        menu.type === "url" && <Menu key={index} name={menu.name} url={menu.url}/>
      ))}
    </Grid>
    {
      props.data.map((menu, index) => (
        menu.type === "folder" && <Grid key={index} container spacing={0} style={{marginBottom: 20}}>
          <Grid style={{marginBottom: 20}}>
            <Typography variant="h4" component="h2">
              {menu.name}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {menu.children.map((menu, index) => (
              <Menu url={menu.url} name={menu.name} key={index}/>
            ))}
          </Grid>
        </Grid>
      ))
    }
  </Grid>
);

export default SubNav;
