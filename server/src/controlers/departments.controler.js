const Department = require("../models/departments.model");

exports.create = async (req,res) => {
    try {

        if(!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // chek for not null
        const {dept_name} = req.body;

        if (!dept_name) {
            res.status(400).send({
                message: "Department name must be filled! required fields!"
            });
            return;
        }

        const department = new Department({
            dept_name:dept_name
        });

        await Department.create(department);

        res.status(201).send({
            message: "Department created!",
            department:department
        });

    } catch (err) {

        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
    }
}

exports.getAll = async (req,res) => {
    try {

        const id = req.params.id;
        const results = await Department.getAll(id);

        res.status(200).send(results);
        
    } catch (err) {

        console.error('Error in exports.getAll:', err);
        res.status(500).send({
            message: 'An error occurred while retrieving Department',
            error: err.message
        });
    }
}

exports.getById = async (req,res) => {
    try {

        const id = req.params.id;
        const department = await Department.getById(id);

        res.status(200).send(department);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Department with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Department with id '});
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
        await Department.update(id,newData);

        res.status(200).send({
            message: `Department updated!`
        });

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Department with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Department with id '});
            console.log(err);
        }
    }
}

exports.delete = async (req,res) => {
    try {

        const id = req.params.id;
        
        await Department.delete(id);

        res.send({
            message: "Department deleted successfully!"
        }).status(204);

    } catch (err) {
        
        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Department with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Department with id '});
            console.log(err);
        }
    }
}
