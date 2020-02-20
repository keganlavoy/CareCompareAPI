const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();




const db = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'CareCompare'


})

db.connect((err) => {

    if(err){
        throw err;
    }

    console.log('MySQL Connected...');

})

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.json({hello: "hi"});
});


app.get('/addUserInfo', (req, res) => {

        let post = {firstname:'John', lastname:'Smith'};
        let sql = 'INSERT INTO users SET ?';
        let query = db.query(sql, post, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.send('Insert John...');
            res.status(200);
        });
    
    });

    app.get('/getUserInfo', (req, res) => {

        
        let sql = 'SELECT * FROM users';
        let query = db.query(sql, (err, results) =>{

            if(err) throw err;
            console.log(results);
            res.send('Users fetched...');
            res.status(200);
        });
    
    });



    app.get('/getSingleUser/:user_id', (req, res) => {

        
        let sql = `SELECT * FROM users WHERE user_id = ${req.params.user_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.get('/updateUser/:user_id', (req, res) => {

        let city = 'Saskatoon';
        let sql = `UPDATE users SET city = '${city}' WHERE user_id = ${req.params.user_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.send('Single User updated...');
            res.status(200);
        });
    
    });



    app.post('/addUser/:userName/:password', (req, res) => {

        let sql = `INSERT INTO users (userName, password) VALUES ('${req.params.userName}', '${req.params.password}');`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    
    app.get('/login/:userName/:password', (req, res) => {

        let sql = `SELECT user_id FROM users WHERE userName = '${req.params.userName}' AND password = '${req.params.password}';`;
        let query = db.query(sql, (err, result) =>{
    
            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    });
        


app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
