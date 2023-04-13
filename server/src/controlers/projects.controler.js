const Project = require("../models/projects.model");


exports.create = async (req,res) => {
    try {

        if(!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // chek for not null
        const {project_name} = req.body;

        if (!project_name) {
            res.status(400).send({
                message: "Project name must be filled! required fields!"
            });
            return;
        }

        const project = new Project({
            project_name:project_name
        });

        await Project.create(project);

        res.status(201).send({
            message: "Project created!",
            project:project
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
        const results = await Project.getAll(id);

        res.status(200).send(results);
        
    } catch (err) {

        console.error('Error in exports.getAll:', err);
        res.status(500).send({
            message: 'An error occurred while retrieving Project',
            error: err.message
        });
    }
}

exports.getById = async (req,res) => {
    try {

        const id = req.params.id;
        const project = await Project.getById(id);

        res.status(200).send(project);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Project with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Project with id '});
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
        await Project.update(id,newData);

        res.status(200).send({
            message: `Project updated!`
        });

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Project with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Project with id '});
            console.log(err);
        }
    }
}

exports.delete = async (req,res) => {
    try {

        const id = req.params.id;
        
        await Project.delete(id);

        res.send({
            message: "Project deleted successfully!"
        }).status(204);

    } catch (err) {
        
        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Project with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Project with id '});
            console.log(err);
        }
    }
}
