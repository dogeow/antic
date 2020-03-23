import React, { useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input/Input'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  green: {
    color: 'green',
  },
  '@global': {
    'h3': {
      borderBottom: '#e0e0e0 1px solid'
    },
  },
}));

const SingleProject = () => {
  const classes = useStyles();
  let history = useHistory();
  const match = useRouteMatch();
  const projectId = match.params.id;

  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios.get(`projects/${projectId}`)
      .then(response => {
        console.log(response.data);
        setProject(response.data);
        setTasks(response.data.tasks);
      });
  }, [projectId]);

  const handleFieldChange = (event) => {
    setTitle(event.target.value)
  };

  const handleAddNewTask = (event) => {
    console.log(tasks);
    event.preventDefault();
    const task = {
      title: title,
      project_id: project.id
    };
    axios
      .post('tasks', task)
      .then(response => {
        console.log(response.data);
        // clear form input
        setTitle('');
        // add new task to list of tasks
        setTasks(tasks.concat(response.data));
      })
      .catch(error => {
        setErrors(error.response.data.errors)
      })
  };

  const handleMarkTaskAsCompleted = (taskId) => {
    const newValues = tasks.map(item => {
      if (item.id !== taskId) return item;
      return {...item, is_completed: 1}
    });
    setTasks(newValues);
    axios.put(`tasks/${taskId}`).then(response => {
    })
  };

  const handleMarkProjectAsCompleted = () => {
    axios.delete(`todo/${projectId}`).then(response => {
    });
    history.put("/todo");
  };

  return (

    <div>
      <Grid container spacing={2} justify="space-between">
        <Grid item>
          <Typography variant="h4" component="h1">{project.name}</Typography>
          <Typography variant="subtitle1" component="h2">
            {project.description}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete" onClick={() => handleMarkProjectAsCompleted()}>
            <DeleteIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="h6" component="h2">
        添加任务
      </Typography>
      <form onSubmit={handleAddNewTask}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Input
              placeholder="任务"
              inputProps={{
                'aria-label': 'Description',
              }}
              name='title'
              className={`form-control ${errors['title'] ? 'is-invalid' : ''}`}
              value={title}
              onChange={handleFieldChange}
            />
            {
              errors['name'] && (
                <span className='invalid-feedback'>
                <strong>{errors['title'][0]}</strong>
                </span>
              )
            }
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">添加</Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <Typography variant="h6" component="h2">
          Todo
        </Typography>

        {tasks.map((task, index) => (
          <Grid key={task.id} container spacing={2} alignContent="center">
            <Grid item>
              {
                task.is_completed ?
                  <RadioButtonChecked className={classes.green}/>
                  :
                  <RadioButtonUnchecked onClick={() => handleMarkTaskAsCompleted(task.id)}/>
              }
            </Grid>
            <Grid item xs>
              <Typography variant="body1" component="h3">
                {task.title}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  )
};

export default SingleProject
