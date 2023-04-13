import React, { useEffect, useState } from 'react';
import './style.css'
import Header from '../../component/Header';
import Main from '../../component/Main/Main';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/api/v1/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/v1/employees/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status === 200) {
          setEmployees(employees.filter((empl) => empl.id !== id));
        } else {
          throw new Error('Failed to delete Employee');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header pagename='Employees' />
      <Main>
        <div>
          <Link to="/employees/create">Add new employee</Link>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Job title</th>
                <th>Project</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((empl) => (
                <tr key={empl.id}>
                  <td>{empl.id}</td>
                  <td>{empl.name}</td>
                  <td>{empl.phone}</td>
                  <td>{empl.department}</td>
                  <td>{empl.job_title}</td>
                  <td>{empl.project}</td>
                  <td>{empl.salary}</td>
                  <td>
                    <button onClick={() => window.location.href = `/employees/${empl.id}/edit`}>Edit</button>
                    <button onClick={() => handleDelete(empl.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Main>
    </>
  )
}

export default Homepage;
