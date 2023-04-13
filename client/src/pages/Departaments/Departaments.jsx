import React, { useEffect, useState } from 'react';
import './style.css'
import Header from '../../component/Header';
import Main from '../../component/Main/Main';
import { Link } from 'react-router-dom';

const Departaments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('/api/v1/departments')
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/v1/departments/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status === 200) {
          setDepartments(departments.filter((dept) => dept.dept_id !== id));
        } else {
          throw new Error('Failed to delete department');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header pagename='Departaments' />
      <Main>
        <div className="table-header">
          <Link to="/departments/create">Create new department</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.dept_id}>
                <td>{dept.dept_id}</td>
                <td>{dept.dept_name}</td>
                <td>
                  <button onClick={() => window.location.href = `/departments/${dept.dept_id}/edit`}>Edit</button>
                  <button onClick={() => handleDelete(dept.dept_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Main>
    </>
  )
}

export default Departaments;
