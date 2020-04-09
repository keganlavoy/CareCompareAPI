const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();



//creates connection to local database 
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


//initial test when first creating API
app.get('/', (req, res) => {
    res.status(200);
    res.json({hello: "hi"});
});





    /*This endpoint is used to retrieve all of the information stored for one particular user.
      This is used when the profile page is accessed to fill in their previous entered data.*/
    app.get('/getSingleUser/:user_id', (req, res) => {

        
        let sql = `SELECT * FROM users WHERE user_id = ` + mysql.escape(`${req.params.user_id}`);
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    /*This is the endpoint used when a user wishes to save new data on the profile page. It takes all of the information entered, escapes all special 
      characters using the mysql.escape() function to avoid SQL injection or cross site scripting and then executes an update query in the database for
      that user. */
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


    /*This is the endpoint used by the signup page to enter a new user into the database. It executes a simple insert query in our 
      database which includes a auto-incremented user_id that is assigned to the new user. */
    app.post('/addUser/:userName/:password', (req, res) => {

        let sql = `INSERT INTO users (userName, password) VALUES (` + mysql.escape(`${req.params.userName}`) + `, ` + mysql.escape(`${req.params.password}`) + `);`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    /*This endpoint is used on the login page to check if the combination of username and password exists in the database.
      if this query returns nothing, an error will be displayed in the browser to the user. If this query returns a user id
      that means the user exists in the system and is logged in. */
    app.post('/login/:userName/:password', (req, res) => {

        let sql = `SELECT user_id FROM users WHERE userName= ` + mysql.escape(`${req.params.userName}`) + ` AND password= ` + mysql.escape(`${req.params.password}`) + `;`;
        let query = db.query(sql, (err, result) =>{
    
            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    });
        

    /*This is the endpoint that allows users to post a new post to the forum. This query initializes a new blog post 
      with the user entered title and body, and sets likes, dislikes, and number of replies to 0. The username of the 
      user who posted is also added here.*/
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


    /*Very simple query that returns the username associated with a particular user ID. this is used to add
      a username to a blog post posted by a particular user. */
    app.get('/getUsername/:user_id', (req, res) => {

        
        let sql = `SELECT userName FROM users WHERE user_id = ${req.params.user_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This is the endpoint that is executed whenever a user visits the main forum page. This query returns the entire
      set of forum posts that are currently within forumposts table. The results are then displayed to the user on the
      forum page in the same order as they are retrieved form the database. */
    app.get('/getBlogPosts', (req, res) => {

        
        let sql = `SELECT * FROM forumposts`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This endpoint is used when a user clicks the search insurance brokers on the get quotes page. This query returns 
      all of the insurers that we have stored within our insurers table. This data is then used to display each insurers 
      individual information as well as calculate their individual prices. */
    app.get('/getInsurers', (req, res) => {

        
        let sql = `SELECT * FROM insurers`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    /*This endpoint is used to check if a particular user has already previously liked a forum post. If this query returns
      nothing, that means that the user has not liked a particular forum post before. If it returns a row from the table, that
      means that the user has already been added to the likes table for that post before and isn't allowed to like the post again. */
    app.get('/checkLike/:post_id/:user_id', (req, res) => {

        
        let sql = `SELECT * FROM forum_likes WHERE post_id = ${req.params.post_id} AND user_id = ${req.params.user_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This endpoint is used to update the likes table when a user likes a new forum post that they haven't liked in the past.
      Their user id is added to the table along with the post id siginifying that a particular user has liked a particular post
      and should not be able to like it again. */
    app.post('/addLike/:post_id/:user_id', (req, res) => {

        let sql = `INSERT INTO forum_likes (post_id, user_id) VALUES (${req.params.post_id}, ${req.params.user_id});`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    /*This endpoint is used to simply increase the number of likes displayed for a post by 1. The update to the number of 
      likes is done before this query is executed, so we can simply set the post_likes = to the parameter likes. */
    app.post('/updateLike/:post_id/:likes', (req, res) => {

        let sql = `UPDATE forumposts SET post_likes = ${req.params.likes} WHERE post_id = ${req.params.post_id};`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });




    /*All dislike functions are identical to the like fucntions. */
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



    /*This endpoint is used by both the reply and view replies pages. This query returns a single forum post, whichever post 
      the user is replying to or viewing replies on. The post retrieved is then displayed at the top of the reply pages so that
      the user has a quick reference and reminder as to what they are replying to. */
    app.get('/getSingleBlogPost/:post_id', (req, res) => {

        
        let sql = `SELECT * FROM forumposts WHERE post_id = ${req.params.post_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This endpoint is used to save a reply to a particular forum post. The reply title, body, and the username of the user
      who posted the reply are added to the replies table and will be displayed on the view replies page for whichever forum
      post that they responded to. */
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


    /*This endpoint simply increases the number of replies for a particular post by 1. works the same as the update likes and dislikes. */
    app.post('/updateReplies/:post_id/:num_replies', (req, res) => {

        let sql = `UPDATE forumposts SET post_replies = ${req.params.num_replies} WHERE post_id = ${req.params.post_id};`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });

    });


    /*This endpoint is used to retrieve all of the replies linked to a particualr forum post when a user clicks on 
      the view replies button of a forum post. All of the replies for that post will then be displayed underneath the
      original forum post so that the user can see the community discussion. */
    app.get('/getAllReplies/:post_id', (req, res) => {

        
        let sql = `SELECT * FROM forum_replies WHERE original_post_id = ${req.params.post_id}`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This endpoint is used when a user enters data for their own personal quote and the insurer they selected was Blue Cross. This query inserts a new quote
      into the user_quotes_blue_cross table which can be used by other queries to calculate the user quotes prices that are displayed on the get quotes page.  */
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

    /*The same as BLue Cross function above except inserts into Sun Life table is user chose Sun Life. */
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

    /*The same as BLue Cross function above except inserts into CAA table is user chose CAA. */
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


    /*The same as BLue Cross function above except inserts into Sure Health table is user chose Sure Health. */
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


    /*This endpoint Retrieves all user quotes from the Blue Cross table which are then used to calculate user quote prices
      for Blue Cross. */
    app.get('/getUserQuotesBlueCross', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_blue_cross`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    /*This endpoint Retrieves all user quotes from the Sun Life table which are then used to calculate user quote prices
      for Sun Life. */
    app.get('/getUserQuotesSunlife', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_sunlife`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    /*This endpoint Retrieves all user quotes from the CAA table which are then used to calculate user quote prices
      for CAA. */
    app.get('/getUserQuotesCAA', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_caa`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    /*This endpoint Retrieves all user quotes from the Sure Health table which are then used to calculate user quote prices
      for Sure Health. */
    app.get('/getUserQuotesSureHealth', (req, res) => {

        
        let sql = `SELECT * FROM user_quotes_sure_health`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This endpoint Retrieves the number of rows within the Blue Cross table and returns it with a name of countValue. This count is 
      used as a stopping condition for the loop that calculates user quote prices for Blue Cross quotes. */
    app.get('/getUserQuotesBlueCrossCount', (req, res) => {

        
        let sql = 'SELECT COUNT(quote_id) AS countValue FROM user_quotes_blue_cross;';
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This endpoint Retrieves the number of rows within the Sun Life table and returns it with a name of countValue. This count is 
      used as a stopping condition for the loop that calculates user quote prices for Sun Life quotes. */
    app.get('/getUserQuotesSunlifeCount', (req, res) => {

        
        let sql = `SELECT COUNT(quote_id) AS countValue FROM user_quotes_sunlife`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });


    /*This endpoint Retrieves the number of rows within the CAA table and returns it with a name of countValue. This count is 
      used as a stopping condition for the loop that calculates user quote prices for CAA quotes. */
    app.get('/getUserQuotesCAACount', (req, res) => {

        
        let sql = `SELECT COUNT(quote_id) AS countValue FROM user_quotes_caa`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

    /*This endpoint Retrieves the number of rows within the Sure Health table and returns it with a name of countValue. This count is 
      used as a stopping condition for the loop that calculates user quote prices for Sure Health quotes. */
    app.get('/getUserQuotesSureHealthCount', (req, res) => {

        
        let sql = `SELECT COUNT(quote_id) AS countValue FROM user_quotes_sure_health`;
        let query = db.query(sql, (err, result) =>{

            if(err) throw err;
            console.log(result);
            res.json(result);
            res.status(200);
        });
    
    });

//runs the Express app on port 3000
app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
