import React, { useState } from 'react';

import Header from '../../component/Header';
import Main from '../../component/Main/Main';
import { Link } from 'react-router-dom';

const CreateDepartment = () => {
  const [deptName, setDeptName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('/api/v1/departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dept_name: deptName }),
    })
      .then((res) => {
        if (res.status === 201) {
            window.location.href = '/departaments';
        } else {
          throw new Error('Failed to create department');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header pagename='Create Department' />
      <Main>
        <form onSubmit={handleFormSubmit}>
          <label>
            Department Name:
            <input
              type='text'
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
            />
          </label>
          <button type='submit'>Create</button>
        </form>
        <Link to='/departaments'>Back to Departments</Link>
      </Main>
    </>
  );
};

export default CreateDepartment;
