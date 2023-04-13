const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Department = function(department) {
    this.dept_id = department.dept_id;
    this.dept_name = department.dept_name;
}

Department.create = async (newDept, result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'INSERT INTO departments SET ?';

        con.query(query,newDept, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }

            console.log('Created department', { id: res.insertId, ...newDept});
            result(null, { id: res.insertId, ...newDept})
        });

        await con.end();

    } catch (err) {
        console.log(err);
        throw err;
    }
}

Department.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        let query = `SELECT * FROM departments`;
        const [results] = await con.execute(query);

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Department.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT *
                        FROM departments 
                        WHERE dept_id = ?`;
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

Department.update = async (id, newData) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'SELECT * FROM departments WHERE dept_id = ?';

        const updateQuery =`UPDATE departments SET 
                                dept_name = COALESCE(?, dept_name)
                            WHERE dept_id = ?`;

        const [results] = await con.execute(query,[id]);
        
        if(results.length === 0) {
            throw { message: 'not_found' };
        } else {
            con.execute(updateQuery, [
                newData.dept_name,
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

Department.delete = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'DELETE FROM departments WHERE dept_id = ?';

        const [results] = await con.execute(query, [id]);
        
        if (results.affectedRows === 0) {
            throw { message: 'not_found' };
        }
    } catch (err) {

        console.log(err);
        throw err;
    }
}

module.exports = Department;