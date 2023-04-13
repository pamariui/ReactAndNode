import React, {useState, useEffect} from 'react';
import './style.css'
import Header from '../../component/Header';
import Main from '../../component/Main/Main';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/v1/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/v1/projects/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.status === 200) {
          setProjects(projects.filter((project) => project.project_id !== id));
        } else {
          throw new Error('Failed to delete project');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header pagename='Departaments' />
      <Main>
        <div className="table-header">
          <Link to="/projects/create">Create new project</Link>
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
            {projects.map((project) => (
              <tr key={project.project_id}>
                <td>{project.project_id}</td>
                <td>{project.project_name}</td>
                <td>
                  <button onClick={() => window.location.href = `/projects/${project.project_id}/edit`}>Edit</button>
                  <button onClick={() => handleDelete(project.project_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Main>
    </>
  )
}

export default Projects;