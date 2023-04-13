import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../component/Header';
import Main from '../../component/Main/Main';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [deptName, setDeptName] = useState('');

  useEffect(() => {
    fetch(`/api/v1/departments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDepartment(data);
        setDeptName(data.dept_name);
        
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/v1/departments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dept_name: deptName }),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/departaments';
        } else {
          throw new Error('Failed to update department');
        }
      })
      .catch((err) => console.error(err));
  };
  
  return (
    <>
       {department && (
            <Header pagename={`Edit Department: ${department[0].dept_name}`} />
        )}
        <Main>
        {department && (
            <form onSubmit={handleSubmit}>
            <label>
                Department Name:
                <input
                type='text'
                value={deptName}
                onChange={(event) => setDeptName(event.target.value)}
                />
            </label>
            <button type='submit'>Save</button>
            </form>
        )}
        </Main>
    </>
  );
};

export default EditDepartment;
