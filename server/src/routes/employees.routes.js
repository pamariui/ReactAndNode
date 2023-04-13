const express = require('express');
const employee = require('../controlers/employees.controler');

const employeeRouter = new express.Router();

employeeRouter.post('/api/v1/employees', employee.create);
employeeRouter.get('/api/v1/employees', employee.getAll);
employeeRouter.get('/api/v1/employees/:id', employee.getById);
employeeRouter.patch('/api/v1/employees/:id', employee.update);
employeeRouter.delete('/api/v1/employees/:id', employee.delete);

module.exports = employeeRouter;