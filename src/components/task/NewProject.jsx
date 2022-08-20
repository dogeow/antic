import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../instance/axios";

const NewProject = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleCreateNewProject = (event) => {
    event.preventDefault();

    axios
      .post("projects", {
        name,
        description,
      })
      .then(() => {
        navigate("/project");
      })
      .catch((error) => {
        setErrors(error.data.errors);
      });
  };

  return (
    <div>
      <h1>创建一个项目</h1>
      <form onSubmit={handleCreateNewProject}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor="name" style={{ marginRight: 10 }}>
              项目名称
            </label>
            <Input
              inputProps={{
                "aria-label": "Description",
              }}
              id="name"
              type="text"
              className={clsx("classes.input", "form-control", {
                "is-invalid": !!errors.name,
              })}
              error={!!errors.name}
              placeholder={errors.name ? errors.name[0] : ""}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginBottom: 10 }}>
              <label>项目信息</label>
            </div>
            <OutlinedInput
              multiline
              rows="10"
              id="description"
              className={`form-control ${errors.description && "is-invalid"}`}
              error={!!errors.description}
              placeholder={errors.description ? errors.description[0] : ""}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" style={{ width: "100%" }}>
              创建
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewProject;
