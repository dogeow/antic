import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const ProjectsList = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={2}
        justify={'space-between'}
        alignItems={'center'}
      >
        <Grid item>
          <Typography variant="h6" component="h2">
            所有项目
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            component={RouterLink}
            to='/todo/create'
          >
            创建新的项目
          </Button>
        </Grid>
      </Grid>
      <List component="nav" aria-label="secondary mailbox folders">
        {
          projects.map((project, index) => (
            <div key={index}>
              <Badge
                color="primary"
                badgeContent={project.tasks_count}
                className={classes.margin}
              >
                <ListItem
                  key={project.id}
                  button
                  component={RouterLink}
                  to={`todo/${project.id}`}
                >
                  <ListItemText primary={project.name}/>
                </ListItem>
              </Badge>
            </div>
          ))
        }
      </List>
    </div>
  );
};

export default ProjectsList;
