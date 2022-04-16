const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'thebest1',
    database: 'employeeTest',
});

app.listen(3001, () => {
    console.log("works")
})