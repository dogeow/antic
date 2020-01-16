import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

const NewProject = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleCreateNewProject = (event) => {
    event.preventDefault();

    const project = {
      name: name,
      description: description
    };

    axios.post('projects', project)
      .then(response => {
        // redirect to the homepage
        history.push('/todo')
      })
      .catch(error => {
        setErrors(error.response.data.errors)
      })
  };

  return (
    <div>
      <h1>创建一个项目</h1>
      <form onSubmit={handleCreateNewProject}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor='name' style={{marginRight: 10}}>项目名称</label>
            <Input
              placeholder="项目名称"
              inputProps={{
                'aria-label': 'Description',
              }}
              id='name'
              type='text'
              className={`classes.input form-control ${!!errors['name'] ? 'is-invalid' : ''}`}
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {
              errors[name] && (
                <span className='invalid-feedback'>
                <strong>{errors['name'][0]}</strong>
              </span>
              )
            }
          </Grid>
          <Grid item xs={12}>
            <div style={{marginBottom: 10}}><label htmlFor='errorsdescription'>项目信息</label></div>
            <OutlinedInput
              multiline={true}
              rows="10"
              id='description'
              className={`form-control ${!!errors['description'] ? 'is-invalid' : ''}`}
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{width: '100%'}}
            />
            {
              errors['description'] && (
                <span className='invalid-feedback'>
              <strong>{errors[name][0]}</strong>
              </span>
              )
            }
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>创建</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default NewProject
