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
    //console.log('Connected'); 
  });




// get all users profile
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM users_profile';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;       
        res.json(results);
    });
  });


  router.get('/:PROFILE_ID', (req, res) => {
    let PROFILE_ID = req.params.PROFILE_ID;
    let sql = 'SELECT * FROM users_profile WHERE PROFILE_ID = '+ PROFILE_ID;
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
          res.json('profile id not found');
        }else{
          res.json(result);
        }   
        console.log(result);      
    });
  });
  

  
  //Save user profile
  router.post('/', (req, res) => {
    let users_profile = req.body;
    let sql = 'INSERT INTO users_profile SET ?';    
    let query = connection.query(sql, users_profile, (err, result) => {
        if(err) throw err;     
        res.send(result);
    });
  });
  
  
  // update user_profile
  router.put('/', (req, res) => {
    connection.query('UPDATE `users_profile` SET  `PROFILE_USER_ID` = ?,  `PROFILE_FULLNAME` =?, `PROFILE_USER_NICKNAME` =?, `PROFILE_USER_DOB` = ?, `PROFILE_USER_IMAGE_ID` = ?, `PROFILE_USER_TYPE` = ?, `PROFILE_USER_IS_DELETED` = ?, `PROFILE_USER_SHOP_ID` = ?  where `PROFILE_ID` = ?', [req.body.PROFILE_USER_ID, req.body.PROFILE_FULLNAME, req.body.PROFILE_USER_NICKNAME, req.body.PROFILE_USER_DOB, req.body.PROFILE_USER_IMAGE_ID, req.body.PROFILE_USER_TYPE,  req.body.PROFILE_USER_IS_DELETED, req.body.PROFILE_USER_SHOP_ID, req.body.PROFILE_ID ], function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
      });
  });
  
  
  
  // delete user profile
    router.delete('/:PROFILE_ID', (req, res) => {
    let PROFILE_ID = req.params.PROFILE_ID; 
    connection.query('DELETE FROM `users_profile` WHERE `PROFILE_ID`=?', [PROFILE_ID], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    });
  });
  
  
  module.exports = router;