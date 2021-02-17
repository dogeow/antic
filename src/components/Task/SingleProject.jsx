import { gql, useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input/Input";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AlertDialog from "../AlertDialog";

const useStyles = makeStyles(() => ({
  green: {
    color: "green",
  },
  input: {
    padding: "2px 0 5px",
  },
  "@global": {
    h3: {
      borderBottom: "#e0e0e0 1px solid",
    },
  },
}));

const PROJECT_BY_ID = gql`
  query($id: Int!) {
    project(id: $id) {
      id
      name
      description
      tasks {
        id
        title
        is_completed
      }
    }
  }
`;

const SingleProject = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const projectId = parseInt(match.params.id);

  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [focus, setFocus] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const [editId, setEditId] = useState();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const { data } = useQuery(PROJECT_BY_ID, {
    variables: { id: projectId },
  });

  useEffect(() => {
    if (data) {
      setTasks(data.project.tasks);
      setProject(data.project);
    }
  }, [data]);

  const handleFieldChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddNewTask = (event) => {
    event.preventDefault();
    axios
      .post(`/projects/${project.id}/task`, {
        title,
      })
      .then(({ data }) => {
        setTitle("");
        setTasks(tasks.concat(data));
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };

  const handleMarkTaskAsCompleted = (taskId) => {
    const newValues = tasks.map((item) => {
      if (item.id !== taskId) return item;
      return { ...item, is_completed: 1 };
    });
    setTasks(newValues);
    axios.put(`tasks/${taskId}`, {
      is_completed: 1,
    });
  };

  const handleMarkProjectAsCompleted = () => {
    axios.delete(`projects/${projectId}`);
    history.push("/project");
  };

  const handleUndoMarkTaskAsCompleted = (taskId) => {
    const newValues = tasks.map((item) => {
      if (item.id !== taskId) return item;
      return { ...item, is_completed: 0 };
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
    setTasks(
      tasks.map((item) =>
        item.id === task.id ? { ...task, title: event.target.value } : item
      )
    );
  };

  const handleFocus = (task) => {
    setFocus(task.title);
  };

  const handleEditPut = (task) => {
    if (focus !== task.title) {
      axios.put(`tasks/${task.id}`, {
        title: task.title,
      });
    }
  };

  const handleDelete = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  return (
    <>
      <AlertDialog
        open={alertDialogOpen}
        handleClose={handleDelete}
        title={`删除「${project.name} 」项目！`}
        content="删除后，任务也将一同被删除！"
        agree={handleMarkProjectAsCompleted}
      />
      <Grid container spacing={2} justify="space-between">
        <Grid item>
          <Typography variant="h4" component="h1">
            {project.name}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            {project.description}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleAddNewTask}>
            <Grid container spacing={2} justify="space-between">
              <Grid item style={{ flexGrow: 1 }}>
                <Input
                  fullWidth
                  placeholder="任务"
                  inputProps={{
                    "aria-label": "Description",
                  }}
                  name="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  value={title}
                  onChange={handleFieldChange}
                />
                {errors.name && (
                  <span className="invalid-feedback">
                    <strong>{errors.title[0]}</strong>
                  </span>
                )}
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
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
                {task.is_completed ? (
                  <RadioButtonChecked
                    className={classes.green}
                    onClick={() => handleUndoMarkTaskAsCompleted(task.id)}
                  />
                ) : (
                  <RadioButtonUnchecked
                    onClick={() => handleMarkTaskAsCompleted(task.id)}
                  />
                )}
              </Grid>
              <Grid item xs>
                {index === editId ? (
                  <Input
                    fullWidth
                    classes={{ input: classes.input }}
                    value={task.title}
                    onFocus={() => handleFocus(task)}
                    onBlur={() => handleEditPut(task)}
                    onChange={(event) => handleEditChange(event, index, task)}
                  />
                ) : (
                  <Typography component="h3" onClick={() => handleEdit(index)}>
                    {task.title}
                  </Typography>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default SingleProject;
