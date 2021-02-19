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
import update from "immutability-helper";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
        order
      }
    }
  }
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",

  background: isDragging ? "gray" : "none",

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "none" : "noe",
});

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
      setTasks(_.orderBy(data.project.tasks, "order"));
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

  const onDragEnd = (result) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    const dragItem = tasks[result.source.index];
    setTasks(
      update(tasks, {
        $splice: [
          [result.source.index, 1],
          [result.destination.index, 0, dragItem],
        ],
      })
    );

    axios.put(`/tasks/${result.draggableId}`, {
      order: result.destination.index,
    });
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Grid
                          key={task.id}
                          container
                          spacing={2}
                          alignContent="center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Grid item>
                            {task.is_completed ? (
                              <RadioButtonChecked
                                className={classes.green}
                                onClick={() =>
                                  handleUndoMarkTaskAsCompleted(task.id)
                                }
                              />
                            ) : (
                              <RadioButtonUnchecked
                                onClick={() =>
                                  handleMarkTaskAsCompleted(task.id)
                                }
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
                                onChange={(event) =>
                                  handleEditChange(event, index, task)
                                }
                              />
                            ) : (
                              <Typography
                                component="h3"
                                onClick={() => handleEdit(index)}
                              >
                                {task.title}
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleProject;
