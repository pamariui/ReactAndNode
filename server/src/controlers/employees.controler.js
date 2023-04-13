const Employee = require("../models/employees.model");

exports.create = async (req,res) => {
    const {name, phone, job_title, dept_id, project_id, salary} = req.body;
    try {

        if(!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // check for not null
        

        if (!name || !phone || !job_title || !dept_id || !project_id || !salary) {
            res.status(400).send({
                message: "All fields are required!"
            });
            return;
        }

        const employee = new Employee({
            name: name,
            phone: phone,
            job_title: job_title,
            salary:salary,
            dept_id: dept_id,
            project_id:project_id
        });

        await Employee.create(employee);

        res.status(201).send({
            message: "Employee created!",
            employee:employee
        });

    } catch (err) {
        if (err.message === 'dept_not_found') {
            return res.status(404).send({
                message: `department with id: ${dept_id} not found!`,
            });
        } if (err.message === 'project_not_found') {
            return res.status(404).send({
                message: `Project with id: ${project_id} not found!`,
            });
        } else {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Order.',
            });
        }
    }
}

exports.getAll = async (req,res) => {
    try {

        const results = await Employee.getAll();

        res.status(200).send(results);
        
    } catch (err) {

        console.error('Error in exports.getAll:', err);
        res.status(500).send({
            message: 'An error occurred while retrieving Employees',
            error: err.message
        });
    }
}

exports.getById = async (req,res) => {
    try {

        const id = req.params.id;
        const employee = await Employee.getById(id);

        res.status(200).send(employee);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Employee with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Employee with id '});
        }
    }
}

exports.update = async (req,res) => {
    try {

        const id = req.params.id;
        const newData = req.body;

        if (!newData) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }
        await Employee.update(id,newData);

        res.status(200).send({
            message: `Employee updated!`
        });

    } catch (err) {

        if (err.message === 'dept_not_found') {
            return res.status(404).send({
                message: `department with id not found!`,
            });
        } if (err.message === 'project_not_found') {
            return res.status(404).send({
                message: `Project with id not found!`,
            });
        } else {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Order.',
            });
        }
    }
}

exports.delete = async (req,res) => {
    try {

        const id = req.params.id;
        
        await Employee.delete(id);

        res.send({
            message: "Employee deleted successfully!"
        }).status(204);

    } catch (err) {
        
        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Employee with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Employee with id '});
            console.log(err);
        }
    }
}