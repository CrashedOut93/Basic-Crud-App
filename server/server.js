const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const request = require('request');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'b0ed7be3a07223',
    host: 'us-cdbr-east-05.cleardb.net',
    password: '9138b9a7',
    database: 'heroku_3cd521099d85ca3',
});
//Test Version
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'employeeTest',
// });

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)',
        [name, age, country, position, wage], (err, result) => {
            if (err) {
                console.log(err);
            }else{
                res.send('Values Inserted')
            }
        }
    );
})

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;
    const country = req.body.country;
    db.query('UPDATE employees SET name = ?, age = ?, country = ?, position = ?, wage = ? WHERE id = ?', [name, age, country, position, wage, id], (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result)
        }
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//mysql:b0ed7be3a07223:9138b9a7@us-cdbr-east-05.cleardb.net/heroku_3cd521099d85ca3?reconnect=true