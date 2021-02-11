import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";
import * as React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NewProject = () => {
  const history = useHistory();

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
        history.push("/project");
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
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
              className={`classes.input form-control
              ${errors.name && "is-invalid"}`}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              创建
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewProject;
