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
    let sql = 'SELECT * FROM items';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;       
        res.json(results);
    });
  });
  
  //Save items
  router.post('/', (req, res) => {
    let items = req.body;
    let sql = 'INSERT INTO items SET ?';    
    let query = connection.query(sql, items, (err, result) => {vcxv
        if(err) throw err;     
        res.send(result);
    });
  });
  
  
  // update user_profile
  router.put('/', (req, res) => {
    connection.query('UPDATE `items` SET  `ITEM_NAME` = ?,  `ITEM_CODE` =?, `ITEM_PRICE` =?, `ITEM_MRP` = ?, `ITEM_DISP_PRICE` = ?, `ITEM_DISCOUNT` = ?, `ITEM_TYPE` = ?, `ITEM_DESCRIPTION` = ?,  `ITEM_CAPACITY` = ?, `ITEM_BRAND` = ?, `ITEM_IMAGE_ID` = ?,  `ITEM_DATE_CREATED` = ?, `ITEM_CREATED_BY_USER` = ?, `ITEM_IS_DELETED` = ?, `ITEM_TAX` = ?   where `ITEM_ID` = ?', [req.body.ITEM_NAME, req.body.ITEM_CODE, req.body.ITEM_PRICE, req.body.ITEM_MRP, req.body.ITEM_DISP_PRICE, req.body.ITEM_DISCOUNT,  req.body.ITEM_TYPE, req.body.ITEM_DESCRIPTION, req.body.ITEM_CAPACITY, req.body.ITEM_BRAND, req.body.ITEM_IMAGE_ID, req.body.ITEM_DATE_CREATED, req.body.ITEM_CREATED_BY_USER, req.body.ITEM_IS_DELETED, req.body.ITEM_TAX, req.body.ITEM_ID ], function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
      });
  });
  
  
  
  // delete user profile
    router.delete('/:ITEM_ID', (req, res) => {
    let ITEM_ID = req.params.ITEM_ID; 
    connection.query('DELETE FROM `items` WHERE `ITEM_ID`=?', [ITEM_ID], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    });
  });


  module.exports = router;