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


    app.post('/updateUser/:user_id/:firstName/:lastName/:DOBmonth/:DOBday/:DOByear/:gender/:homeAddress/:city/:province/:postalCode/:email/:phoneNum/:maritalStatus/:children', (req, res) => {

        let sql = `UPDATE users SET firstName = '${req.params.firstName}', lastName = '${req.params.lastName}', DOBmonth = ${req.params.DOBmonth}, DOBday = ${req.params.DOBday}, DOByear = ${req.params.DOByear}, gender = '${req.params.gender}', homeAddress = '${req.params.homeAddress}', city = '${req.params.city}', province = '${req.params.province}', postalCode = '${req.params.postalCode}', email = '${req.params.email}', phoneNum = '${req.params.phoneNum}', maritalStatus = '${req.params.maritalStatus}', children = ${req.params.children} WHERE user_id = ${req.params.user_id};`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
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


    
    app.post('/login/:userName/:password', (req, res) => {

        let sql = `SELECT user_id FROM users WHERE userName='${req.params.userName}' AND password='${req.params.password}';`;
        let query = db.query(sql, (err, result) =>{
    
            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    });
        

    app.post('/addBlogPost/:user_id/:postTitle/:postBody/:username', (req, res) => {

        let sql = `INSERT INTO forumposts (post_title, post_body, post_likes, post_dislikes, post_replies, user_id, username) VALUES ('${req.params.postTitle}', '${req.params.postBody}', 0, 0, 0, ${req.params.user_id}, '${req.params.username}');`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });



    app.get('/getUsername/:user_id', (req, res) => {

        
        let sql = `SELECT userName FROM users WHERE user_id = ${req.params.user_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });



    app.get('/getBlogPosts', (req, res) => {

        
        let sql = `SELECT * FROM forumposts`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    app.get('/getInsurers', (req, res) => {

        
        let sql = `SELECT * FROM insurers`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    app.get('/checkLike/:post_id/:user_id', (req, res) => {

        
        let sql = `SELECT * FROM forum_likes WHERE post_id = ${req.params.post_id} AND user_id = ${req.params.user_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.post('/addLike/:post_id/:user_id', (req, res) => {

        let sql = `INSERT INTO forum_likes (post_id, user_id) VALUES (${req.params.post_id}, ${req.params.user_id});`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    app.post('/updateLike/:post_id/:likes', (req, res) => {

        let sql = `UPDATE forumposts SET post_likes = ${req.params.likes} WHERE post_id = ${req.params.post_id};`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });





    app.get('/checkDislike/:post_id/:user_id', (req, res) => {

        
        let sql = `SELECT * FROM forum_dislikes WHERE post_id = ${req.params.post_id} AND user_id = ${req.params.user_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.post('/addDislike/:post_id/:user_id', (req, res) => {

        let sql = `INSERT INTO forum_dislikes (post_id, user_id) VALUES (${req.params.post_id}, ${req.params.user_id});`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    app.post('/updateDislike/:post_id/:dislikes', (req, res) => {

        let sql = `UPDATE forumposts SET post_dislikes = ${req.params.dislikes} WHERE post_id = ${req.params.post_id};`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });





app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
