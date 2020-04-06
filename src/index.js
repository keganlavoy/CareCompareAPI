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






    app.get('/getSingleUser/:user_id', (req, res) => {

        
        let sql = `SELECT * FROM users WHERE user_id = ` + mysql.escape(`${req.params.user_id}`);
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.post('/updateUser/:user_id/:firstName/:lastName/:DOBmonth/:DOBday/:DOByear/:gender/:homeAddress/:city/:province/:postalCode/:email/:phoneNum/:maritalStatus/:children', (req, res) => {

        let sql = `UPDATE users SET firstName = ` + mysql.escape(`${req.params.firstName}`) + `, lastName = ` + mysql.escape(`${req.params.lastName}`) + `, DOBmonth = ` + mysql.escape(`${req.params.DOBmonth}`) + 
        `, DOBday = ` + mysql.escape(`${req.params.DOBday}`) + `, DOByear = ` + mysql.escape(`${req.params.DOByear}`) + `, gender = ` + mysql.escape(`${req.params.gender}`) + `, homeAddress = `
        + mysql.escape(`${req.params.homeAddress}`) + `, city = ` + mysql.escape(`${req.params.city}`) + `, province = ` + mysql.escape(`${req.params.province}`) + `, postalCode = `
        + mysql.escape(`${req.params.postalCode}`) + `, email = ` + mysql.escape(`${req.params.email}`) + `, phoneNum = ` + mysql.escape(`${req.params.phoneNum}`) + `, maritalStatus = `
        + mysql.escape(`${req.params.maritalStatus}`) + `, children = ` + mysql.escape(`${req.params.children}`) + ` WHERE user_id = ${req.params.user_id};`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });



    app.post('/addUser/:userName/:password', (req, res) => {

        let sql = `INSERT INTO users (userName, password) VALUES (` + mysql.escape(`${req.params.userName}`) + `, ` + mysql.escape(`${req.params.password}`) + `);`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    
    app.post('/login/:userName/:password', (req, res) => {

        let sql = `SELECT user_id FROM users WHERE userName= ` + mysql.escape(`${req.params.userName}`) + ` AND password= ` + mysql.escape(`${req.params.password}`) + `;`;
        let query = db.query(sql, (err, result) =>{
    
            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    });
        

    app.post('/addBlogPost/:user_id/:postTitle/:postBody/:username', (req, res) => {

        let sql = `INSERT INTO forumposts (post_title, post_body, post_likes, post_dislikes, post_replies, user_id, username) VALUES (` 
        + mysql.escape(`${req.params.postTitle}`) + `, ` + mysql.escape(`${req.params.postBody}`) + `, 0, 0, 0, ` + mysql.escape(`${req.params.user_id}`) + 
        `, ` + mysql.escape(`${req.params.username}`) + `);`;


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



    app.get('/getSingleBlogPost/:post_id', (req, res) => {

        
        let sql = `SELECT * FROM forumposts WHERE post_id = ${req.params.post_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.post('/addReply/:user_id/:replyTitle/:replyBody/:username/:post_id', (req, res) => {

        let sql = `INSERT INTO forum_replies (reply_title, reply_body, user_id, username, original_post_id) VALUES (` 
        + mysql.escape(`${req.params.replyTitle}`) + `, ` + mysql.escape(`${req.params.replyBody}`) + `, ` + mysql.escape(`${req.params.user_id}`) + 
        `, ` + mysql.escape(`${req.params.username}`) + `, ` + mysql.escape(`${req.params.post_id}`) + `);`;


        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    app.post('/updateReplies/:post_id/:num_replies', (req, res) => {

        let sql = `UPDATE forumposts SET post_replies = ${req.params.num_replies} WHERE post_id = ${req.params.post_id};`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });



    app.get('/getAllReplies/:post_id', (req, res) => {

        
        let sql = `SELECT * FROM forum_replies WHERE original_post_id = ${req.params.post_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.post('/submitQuoteBlueCross/:prescriptionDrugs/:dental/:studentAccident/:VIPtravel/:hospitalCash/:criticalIllness/:termLifeInsurance/:totalQuote', (req, res) => {

        let sql = `INSERT INTO user_quotes_blue_cross (prescription_drugs, dental, student_accident, vip_travel, hospital_cash, critical_illness, term_life_insurance, total_quote) VALUES 
        (${req.params.prescriptionDrugs}, ${req.params.dental}, ${req.params.studentAccident}, ${req.params.VIPtravel}, ${req.params.hospitalCash}, ${req.params.criticalIllness}, 
            ${req.params.termLifeInsurance}, ${req.params.totalQuote});`;


        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });

    app.post('/submitQuoteSunlife/:prescriptionDrugs/:dental/:studentAccident/:VIPtravel/:hospitalCash/:criticalIllness/:termLifeInsurance/:totalQuote', (req, res) => {

        let sql = `INSERT INTO user_quotes_sunlife (prescription_drugs, dental, student_accident, vip_travel, hospital_cash, critical_illness, term_life_insurance, total_quote) VALUES 
        (${req.params.prescriptionDrugs}, ${req.params.dental}, ${req.params.studentAccident}, ${req.params.VIPtravel}, ${req.params.hospitalCash}, ${req.params.criticalIllness}, 
            ${req.params.termLifeInsurance}, ${req.params.totalQuote});`;


        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });

    app.post('/submitQuoteCAA/:prescriptionDrugs/:dental/:studentAccident/:VIPtravel/:hospitalCash/:criticalIllness/:termLifeInsurance/:totalQuote', (req, res) => {

        let sql = `INSERT INTO user_quotes_caa (prescription_drugs, dental, student_accident, vip_travel, hospital_cash, critical_illness, term_life_insurance, total_quote) VALUES 
        (${req.params.prescriptionDrugs}, ${req.params.dental}, ${req.params.studentAccident}, ${req.params.VIPtravel}, ${req.params.hospitalCash}, ${req.params.criticalIllness}, 
            ${req.params.termLifeInsurance}, ${req.params.totalQuote});`;


        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    app.post('/submitQuoteSureHealth/:prescriptionDrugs/:dental/:studentAccident/:VIPtravel/:hospitalCash/:criticalIllness/:termLifeInsurance/:totalQuote', (req, res) => {

        let sql = `INSERT INTO user_quotes_sure_health (prescription_drugs, dental, student_accident, vip_travel, hospital_cash, critical_illness, term_life_insurance, total_quote) VALUES 
        (${req.params.prescriptionDrugs}, ${req.params.dental}, ${req.params.studentAccident}, ${req.params.VIPtravel}, ${req.params.hospitalCash}, ${req.params.criticalIllness}, 
            ${req.params.termLifeInsurance}, ${req.params.totalQuote});`;


        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    app.get('/getUserQuotesBlueCross', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_blue_cross`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    app.get('/getUserQuotesSunlife', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_sunlife`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    app.get('/getUserQuotesCAA', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_caa`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    app.get('/getUserQuotesSureHealth', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_sure_health`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    app.get('/getUserQuotesBlueCrossCount', (req, res) => {

        
        let sql = 'SELECT COUNT(quote_id) AS countValue FROM user_quotes_blue_cross;';
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.get('/getUserQuotesSunlifeCount', (req, res) => {

        
        let sql = `SELECT COUNT(quote_id) AS countValue FROM user_quotes_sunlife`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    app.get('/getUserQuotesCAACount', (req, res) => {

        
        let sql = `SELECT COUNT(quote_id) AS countValue FROM user_quotes_caa`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    app.get('/getUserQuotesSureHealthCount', (req, res) => {

        
        let sql = `SELECT COUNT(quote_id) AS countValue FROM user_quotes_sure_health`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
