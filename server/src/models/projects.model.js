const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Project = function(project) {
    this.project_id = project.project_id;
    this.project_name = project.project_name;
}

Project.create = async (newProject, result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'INSERT INTO projects SET ?';

        con.query(query,newProject, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }

            console.log('Created project', { id: res.insertId, ...newProject});
            result(null, { id: res.insertId, ...newProject})
        });

        await con.end();

    } catch (err) {
        console.log(err);
        throw err;
    }
}

Project.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        let query = `SELECT * FROM projects`;
        const [results] = await con.execute(query);

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Project.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT *
                        FROM projects 
                        WHERE project_id = ?`;
        const [results] = await con.execute(query,[id]);
    
        if (!results.length) {
            throw { message: 'not_found' };
        }

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Project.update = async (id, newData) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'SELECT * FROM projects WHERE project_id = ?';

        const updateQuery =`UPDATE Projects SET 
                                project_name = COALESCE(?, project_name)
                            WHERE project_id = ?`;

        const [results] = await con.execute(query,[id]);
        
        if(results.length === 0) {
            throw { message: 'not_found' };
        } else {
            con.execute(updateQuery, [
                newData.project_name,
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

Project.delete = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'DELETE FROM projects WHERE project_id = ?';

        const [results] = await con.execute(query, [id]);
        
        if (results.affectedRows === 0) {
            throw { message: 'not_found' };
        }
    } catch (err) {

        console.log(err);
        throw err;
    }
}

module.exports = Project;