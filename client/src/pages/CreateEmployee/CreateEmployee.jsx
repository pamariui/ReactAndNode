import React, { useState,useEffect } from 'react';
import Header from '../../component/Header';
import Main from '../../component/Main/Main';

const CreateEmployee = () => {
    const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [project, setProject] = useState('');
  const [salary, setSalary] = useState('');

  const [departmentsList, setDepartmentsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    fetch('/api/v1/departments')
      .then((res) => res.json())
      .then((data) => {
        setDepartmentsList(data);
      })
      .catch((err) => console.error(err));

    fetch('/api/v1/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjectsList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const employee = {
      name,
      phone,
      dept_id: department,
      job_title: jobTitle,
      project_id : project,
      salary,
    };

    fetch('/api/v1/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
      .then((res) => {
        if (res.status === 201) {
          setName('');
          setPhone('');
          setDepartment('');
          setJobTitle('');
          setProject('');
          setSalary('');
          window.location = '/';
        } else {
          throw new Error('Failed to create employee');
        }
      })
      .catch((err) => console.error(err));
  };
  console.log(departmentsList,projectsList)
    return (
      <>
        <Header pagename="Create Employee" />
    <Main>
      <form className="create-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">Select Department</option>
            {departmentsList.map((dept) => (
              <option key={dept.dept_id} value={dept.dept_id}>
                {dept.dept_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="project">Project:</label>
          <select
            id="project"
            value={project}
            onChange={(event) => setProject(event.target.value)}
          >
            <option value="">Select Project</option>
            {projectsList.map((proj) => (
              <option key={proj.project_id} value={proj.project_id}>
                {proj.project_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </Main>
    </>
  );
};

export default CreateEmployee;
