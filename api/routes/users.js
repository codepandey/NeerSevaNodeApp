const express = require('express');
const router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'neerseva_db'
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected'); 
  });

// get all users
router.get('/', (req, res, next) => {
    let sql = 'SELECT * FROM users';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;       
        res.json(results);
    });
  });


  // Get user by Id

  router.get('/:USER_ID', (req, res) => {
    let USER_ID = req.params.USER_ID;
    let sql = 'SELECT * FROM users WHERE USER_ID = '+ USER_ID;
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
          res.json('users not found');
        }else{
          res.json(result);
        }                
    });
  });

  //Save user
router.post('/', (req, res) => {
    let users = req.body;
    let sql = 'INSERT INTO users SET ?';    
    let query = connection.query(sql, users, (err, result) => {
        if(err) throw err;        
        res.send(result);
    });
});


// update users
router.put('/', (req, res) => {
  connection.query('UPDATE `users` SET  `USER_NAME` = ?, `USER_CONTACT` = ?, `USER_EMAIL` = ?, `USER_ADDRESS_ID` = ?, `USER_TYPE_ID` = ?, `USER_IS_DELETED` = ?, `USER_IS_ACTIVE` = ?, `USER_DATE_CREATED` = ?, `USER_IS_PROFILE_COMPLETED` = ?, `USER_PROFILE_ID` = ?   where `USER_ID` = ?', [req.body.USER_NAME, req.body.USER_CONTACT, req.body.USER_EMAIL, req.body.USER_ADDRESS_ID, req.body.USER_TYPE_ID, req.body.USER_IS_DELETED, req.body.USER_IS_ACTIVE, req.body.USER_DATE_CREATED, req.body.USER_IS_PROFILE_COMPLETED, req.body.USER_PROFILE_ID,  req.body.USER_ID], function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
      });
  });



// delete users
    router.delete('/:USER_ID', (req, res) => {
    let USER_ID = req.params.USER_ID;    
    connection.query('DELETE FROM `users` WHERE `USER_ID`=?', [USER_ID], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    });
});


module.exports = router;
