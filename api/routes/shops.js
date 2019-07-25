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

  // get all ITEMS 
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM shops';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;       
        res.json(results);
    });
  });
  
  //Save items
  router.post('/', (req, res) => {
    let shops = req.body;
    let sql = 'INSERT INTO shops SET ?';    
    let query = connection.query(sql, shops, (err, result) => {
        if(err) throw err;     
        res.send(result);
    });
  });
  
  
  // update user_profile
  router.put('/', (req, res) => {
    connection.query('UPDATE `shops` SET  `SHOP_NAME` = ?,  `SHOP_IMAGE_ID` =?, `SHOP_TYPE` =?, `SHOP_ADDRESS_ID` = ?, `SHOP_CODE` = ?, `SHOP_BRANCH` = ?  where `SHOP_ID` = ?', [req.body.SHOP_NAME, req.body.SHOP_IMAGE_ID, req.body.SHOP_TYPE, req.body.SHOP_ADDRESS_ID, req.body.SHOP_CODE, req.body.SHOP_BRANCH, req.body.SHOP_ID ], function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
      });
  });
  
  
  
  // delete user profile
    router.delete('/:SHOP_ID', (req, res) => {
    let SHOP_ID = req.params.SHOP_ID; 
    connection.query('DELETE FROM `shops` WHERE `SHOP_ID`=?', [SHOP_ID], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    });
  });


  module.exports = router;