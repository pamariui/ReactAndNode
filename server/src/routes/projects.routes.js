const express = require('express');
const project = require('../controlers/projects.controler');

const projectRouter = new express.Router();

projectRouter.post('/api/v1/projects', project.create);
projectRouter.get('/api/v1/projects', project.getAll);
projectRouter.get('/api/v1/projects/:id', project.getById);
projectRouter.patch('/api/v1/projects/:id', project.update);
projectRouter.delete('/api/v1/projects/:id', project.delete);

module.exports = projectRouter;