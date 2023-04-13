import React, { useState } from 'react';

import Header from '../../component/Header';
import Main from '../../component/Main/Main';
import { Link } from 'react-router-dom';

const CreateProject = () => {
  const [project, setProject] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('/api/v1/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_name: project }),
    })
      .then((res) => {
        if (res.status === 201) {
            window.location.href = '/projects';
        } else {
          throw new Error('Failed to create Project');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header pagename='Create Project' />
      <Main>
        <form onSubmit={handleFormSubmit}>
          <label>
            Project Name:
            <input
              type='text'
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
          </label>
          <button type='submit'>Create</button>
        </form>
        <Link to='/departaments'>Back to Projects</Link>
      </Main>
    </>
  );
};

export default CreateProject;
