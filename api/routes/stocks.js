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

  // Stock API

// get all stocks
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM stocks';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;      
        res.json(results);
    });
  });
  
  
  // Get stocks by Id
  
  router.get('/:STOCK_ID', (req, res) => {
    let STOCK_ID = req.params.STOCK_ID;
    let sql = 'SELECT * FROM stocks WHERE STOCK_ID = '+ STOCK_ID;
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length == 0){
          res.json('stocks not found');
        }else{
          res.json(result);
        }   
        console.log(result);      
    });
  });
  
  //Save stocks
  router.post('/', (req, res) => {
    let stocks = req.body;
    let sql = 'INSERT INTO stocks SET ?';    
    let query = connection.query(sql, stocks, (err, result) => {
        if(err) throw err;     
        res.send(result);
    });
  });
  
  
  // update stocks
  router.put('/', (req, res) => {
    connection.query('UPDATE `stocks` SET  `STOCK_QUANTITY` = ?,  `STOCK_ITEM_ID` =?, `STOCK_DATE_CREATED` =?, `STOCK_IS_AVAILABLE` = ?, `STOCK_IS_DELETED` = ? where `STOCK_ID` = ?', [req.body.STOCK_QUANTITY, req.body.STOCK_ITEM_ID, req.body.STOCK_DATE_CREATED, req.body.STOCK_IS_AVAILABLE, req.body.STOCK_IS_DELETED, req.body.STOCK_ID], function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
      });
  });
  
  
  
  // delete stocks
    router.delete('/:STOCK_ID', (req, res) => {
    let STOCK_ID = req.params.STOCK_ID; 
    connection.query('DELETE FROM `stocks` WHERE `STOCK_ID`=?', [STOCK_ID], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    });
  });
  
  module.exports = router;