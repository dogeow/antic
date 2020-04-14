import React, {useState, useEffect} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input/Input';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import {makeStyles} from '@material-ui/core/styles';
import AlertDialog from '../AlertDialog';

const useStyles = makeStyles(theme => ({
  green: {
    color: 'green',
  },
  input: {
    padding: '2px 0 5px',
  },
  '@global': {
    'h3': {
      borderBottom: '#e0e0e0 1px solid',
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

  const [editId, setEditId] = useState();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    axios.get(`projects/${projectId}`).then(response => {
      setProject(response.data);
      setTasks(response.data.tasks);
    });
  }, [projectId]);

  const handleFieldChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddNewTask = (event) => {
    event.preventDefault();
    const task = {
      title: title,
      project_id: project.id,
    };
    axios.post('tasks', task).then(response => {
      setTitle('');
      setTasks(tasks.concat(response.data));
    }).catch(error => {
      setErrors(error.response.data.errors);
    });
  };

  const handleMarkTaskAsCompleted = (taskId) => {
    const newValues = tasks.map(item => {
      if (item.id !== taskId) return item;
      return {...item, is_completed: 1};
    });
    setTasks(newValues);
    axios.put(`tasks/${taskId}`, {
      is_completed: 1,
    });
  };

  const handleMarkProjectAsCompleted = () => {
    axios.delete(`projects/${projectId}`);
    history.push('/todo');
  };

  const handleUndoMarkTaskAsCompleted = (taskId) => {
    const newValues = tasks.map(item => {
      if (item.id !== taskId) return item;
      return {...item, is_completed: 0};
    });
    setTasks(newValues);
    axios.put(`tasks/${taskId}`, {
      is_completed: 0,
    });
  };

  const handleEdit = (index) => {
    setEditId(index);
  };

  const handleEditChange = (event, index, task) => {
    setTasks(tasks.map(item => (
      item.id === task.id
        ? {...task, title: event.target.value}
        : item
    )));
  };

  const handleEditPut = (task) => {
    axios.put(`tasks/${task.id}`, {
      title: task.title,
    });
  };

  const handleDelete = () => {
    setAlert(!alert);
  };

  return (
    <>
      <AlertDialog
        open={alert} handleClose={handleDelete}
        title={'删除项目！'} content={'删除后，任务也将一同被删除！'}
        agree={handleMarkProjectAsCompleted}/>
      <Grid container spacing={2} justify="space-between">
        <Grid item>
          <Typography variant="h4" component="h1">{project.name}</Typography>
          <Typography variant="subtitle1" component="h2">
            {project.description}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}>
            <DeleteIcon/>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleAddNewTask}>
            <Grid container spacing={2} justify="space-between">
              <Grid item>
                <Input
                  placeholder="任务"
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                  name='title'
                  className={`form-control ${errors['title']
                    ? 'is-invalid'
                    : ''}`}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary">
                  添加
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Todo
          </Typography>
          {tasks.map((task, index) => (
            <Grid key={task.id} container spacing={2} alignContent="center">
              <Grid item>
                {
                  task.is_completed ?
                    <RadioButtonChecked
                      className={classes.green}
                      onClick={() => handleUndoMarkTaskAsCompleted(task.id)}
                    />
                    :
                    <RadioButtonUnchecked
                      onClick={() => handleMarkTaskAsCompleted(task.id)}
                    />
                }
              </Grid>
              <Grid item xs>
                {
                  index === editId ?
                    <Input
                      fullWidth
                      classes={{input: classes.input}}
                      value={task.title}
                      onBlur={() => handleEditPut(task)}
                      onChange={(event) => handleEditChange(event, index,
                        task)}
                    />
                    :
                    <Typography
                      component="h3"
                      onClick={() => handleEdit(index)}>
                      {task.title}
                    </Typography>
                }
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default SingleProject;
