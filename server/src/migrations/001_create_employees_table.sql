CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    project_id INT,
    dept_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE SET NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);