const express = require('express');
const department = require('../controlers/departments.controler');

const departmentRouter = new express.Router();

departmentRouter.post('/api/v1/departments', department.create);
departmentRouter.get('/api/v1/departments', department.getAll);
departmentRouter.get('/api/v1/departments/:id', department.getById);
departmentRouter.patch('/api/v1/departments/:id', department.update);
departmentRouter.delete('/api/v1/departments/:id', department.delete);

module.exports = departmentRouter;