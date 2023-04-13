const express = require('express');
const cors = require('cors');


const departmentRouter = require('./src/routes/departments.routes');
const projectRouter = require('./src/routes/projects.routes');
const employeeRouter = require('./src/routes/employees.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());



app.use(departmentRouter);
app.use(projectRouter);
app.use(employeeRouter);

const PORT = process.env.SERVER_PORT || 4040;

app.listen(PORT, () => {
    console.log(`Server is listed on port: ${PORT}`);
});