const pool = require('./config/index')
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/students', (req, res) => {
    pool.query('SELECT * FROM students', (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(result.rows);
        }
    });
});


app.post('/students', (req, res) => {
    const { firstname, lastname, age, group } = req.body;
    pool.query('INSERT INTO students (firstname, lastname, age, "group") VALUES ($1, $2, $3, $4)', [firstname, lastname, age, group], (error, result) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).send({ message: 'User added successfully'});
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});