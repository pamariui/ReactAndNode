const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Employee = function(employee) {
    this.id = employee.id;
    this.name = employee.name;
    this.job_title = employee.job_title;
    this.phone = employee.phone;
    this.salary = employee.salary;
    this.project_id = employee.project_id;
    this.dept_id = employee.dept_id;
}

Employee.create = async (newEmployee, result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);

        // Chek if department exists
        const [deptRows] = await con.query(
            `SELECT * 
            FROM departments
            WHERE dept_id = ?`,
            [newEmployee.dept_id]
        );
        if(deptRows.length === 0) {
            throw { message: 'dept_not_found' };
        };

         // Chek if product exists
         const [projectRows] = await con.query(
            `SELECT * 
            FROM projects 
            WHERE project_id = ?`,
            [newEmployee.project_id]
        );

        if(projectRows.length === 0) {
            throw { message: 'project_not_found' };
        }
        const query = 'INSERT INTO employees SET ?';

        con.query(query,newEmployee, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }

            console.log('Created employee', { id: res.insertId, ...newEmployee});
            result(null, { id: res.insertId, ...newEmployee})
        });

        await con.end();

    } catch (err) {
        console.log(err);
        throw err;
    }
}

Employee.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT employees.id, employees.name, employees.job_title, employees.phone, employees.salary, 
                        projects.project_name AS project, 
                        departments.dept_name AS department
                        FROM employees
                        LEFT JOIN projects ON employees.project_id = projects.project_id
                        LEFT JOIN departments ON employees.dept_id = departments.dept_id`;

        const [results] = await con.execute(query);

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Employee.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT employees.id, employees.name, employees.job_title, employees.phone, employees.salary, 
                        projects.project_name AS project, 
                        departments.dept_name AS department
                        FROM employees
                        LEFT JOIN projects ON employees.project_id = projects.project_id
                        LEFT JOIN departments ON employees.dept_id = departments.dept_id
                        WHERE employees.id = ?`;
        const [results] = await con.execute(query,[id]);
    
        if (!results.length) {
            throw { message: 'not_found' };
        }

        await con.end();
        return results[0];

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Employee.update = async (id, newData) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        // Chek if department exists
        const [deptRows] = await con.query(
            `SELECT * 
            FROM departments
            WHERE dept_id = ?`,
            [newData.dept_id]
        );
        if(deptRows.length === 0) {
            throw { message: 'dept_not_found' };
        };

         // Chek if product exists
         const [projectRows] = await con.query(
            `SELECT * 
            FROM projects 
            WHERE project_id = ?`,
            [newData.project_id]
        );

        if(projectRows.length === 0) {
            throw { message: 'project_not_found' };
        }
        const query = 'SELECT * FROM employees WHERE id = ?';

        const updateQuery =`UPDATE employees SET 
                                name = COALESCE(?, name),
                                job_title = COALESCE(?, job_title),
                                phone = COALESCE(?, phone),
                                salary = COALESCE(?, salary),
                                project_id = COALESCE(?, project_id),
                                dept_id = COALESCE(?, dept_id)
                            WHERE id = ?`;

        const [results] = await con.execute(query,[id]);
        
        if(results.length === 0) {
            throw { message: 'not_found' };
        } else {
            con.execute(updateQuery, [
                newData.name,
                newData.job_title,
                newData.phone,
                newData.salary,
                newData.project_id,
                newData.dept_id,
                id], (err,data) => {
                    if(err) throw err;
                });
        }

        await con.end();

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Employee.delete = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'DELETE FROM employees WHERE id = ?';
        const [results] = await con.execute(query, [id]);
        
        if (results.affectedRows === 0) {
            throw { message: 'not_found' };
        }

        await con.end();

    } catch (err) {

        console.log(err);
        throw err;
    }
}

module.exports = Employee;