import { gql, useQuery } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input/Input";
import Typography from "@mui/material/Typography";
import update from "immutability-helper";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../../instance/axios";
import AlertDialog from "../AlertDialog";

const PROJECT_BY_ID = gql`
  query ($id: Int!) {
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

const SingleProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState<any>({});
  const [tasks, setTasks] = useState<any[]>([]);
  const [focus, setFocus] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [errors, setErrors] = useState<any[]>([]);

  const [editId, setEditId] = useState<number | undefined>();
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

  const { data } = useQuery(PROJECT_BY_ID, {
    variables: { id: parseInt(id) },
  });

  useEffect(() => {
    if (data) {
      setTasks(data.project.tasks);
      setProject(data.project);
    }
  }, [data]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setTasks([data, ...tasks]);
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
    axios.put(`projects/${project.id}/tasks/${taskId}`, {
      is_completed: 1,
    });
  };

  const handleMarkProjectAsCompleted = () => {
    axios.delete(`projects/${project.id}`);
    navigate("/project");
  };

  const handleUndoMarkTaskAsCompleted = (taskId) => {
    const newValues = tasks.map((item) => {
      if (item.id !== taskId) return item;
      return { ...item, is_completed: 0 };
    });
    setTasks(newValues);
    axios.put(`projects/${project.id}/tasks/${taskId}`, {
      is_completed: 0,
    });
  };

  const handleEdit = (index) => {
    setEditId(index);
  };

  const handleEditChange = (event, index, task) => {
    setTasks(tasks.map((item) => (item.id === task.id ? { ...task, title: event.target.value } : item)));
  };

  const handleFocus = (task) => {
    setFocus(task.title);
  };

  const handleEditPut = (task) => {
    if (focus !== task.title) {
      axios.put(`projects/${project.id}/tasks/${task.id}`, {
        title: task.title,
      });
    }

    setEditId(undefined);
  };

  const handleAlertDialogToggle = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  const onDragEnd = (result) => {
    if (!result.destination || result.destination.index === result.source.index) {
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

    axios.put(`projects/${project.id}/tasks/${result.draggableId}`, {
      order: result.destination.index,
    });
  };

  return (
    <>
      <AlertDialog
        open={alertDialogOpen}
        handleClose={handleAlertDialogToggle}
        title={`删除「${project.name} 」项目！`}
        content="删除后，任务也将一同被删除！"
        agree={handleMarkProjectAsCompleted}
      />
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ "@global": { h3: { borderBottom: "#e0e0e0 1px solid" } } }}
      >
        <Grid item>
          <Typography variant="h4" component="h1">
            {project.name}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            {project.description}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete" onClick={handleAlertDialogToggle} size="large">
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleAddNewTask}>
            <Grid container spacing={2} justifyContent="space-between">
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
            代办事项
          </Typography>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ background: snapshot.isDraggingOver ? "none" : "noe" }}
                >
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <Grid
                          key={task.id}
                          container
                          spacing={2}
                          alignContent="center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            background: snapshot.isDragging ? "gray" : "none",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <Grid item>
                            {task.is_completed ? (
                              <RadioButtonChecked
                                className={classes.green}
                                onClick={() => handleUndoMarkTaskAsCompleted(task.id)}
                              />
                            ) : (
                              <RadioButtonUnchecked onClick={() => handleMarkTaskAsCompleted(task.id)} />
                            )}
                          </Grid>
                          <Grid item xs>
                            {index === editId ? (
                              <Input
                                fullWidth
                                sx={{
                                  input: {
                                    padding: "2px 0 5px",
                                  },
                                }}
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
