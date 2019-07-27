//const morgan = require('morgan');
//const helmet = require('helmet');
const express = require('express');
const app = express();
//const Joi = require('joi');
var mysql = require('mysql');

//app.use(morgan('tiny'));
//app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(3000, () => console.log('listening on port 3000...'));


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




function log(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
}




// get all users
app.get('/neerseva/users', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;       
        res.json(results);
    });
  });


  // Get user by Id

  app.get('/neerseva/users/:USER_ID', (req, res) => {
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
app.post('/neerseva/users', (req, res) => {
    let users = req.body;
    let sql = 'INSERT INTO users SET ?';    
    let query = connection.query(sql, users, (err, result) => {
        if(err) throw err;        
        res.send(result);
    });
});


// update users
app.put('/neerseva/users', (req, res) => {
  connection.query('UPDATE `users` SET  `USER_NAME` = ?, `USER_CONTACT` = ?, `USER_EMAIL` = ?, `USER_ADDRESS_ID` = ?, `USER_TYPE_ID` = ?, `USER_IS_DELETED` = ?, `USER_IS_ACTIVE` = ?, `USER_DATE_CREATED` = ?, `USER_IS_PROFILE_COMPLETED` = ?, `USER_PROFILE_ID` = ?   where `USER_ID` = ?', [req.body.USER_NAME, req.body.USER_CONTACT, req.body.USER_EMAIL, req.body.USER_ADDRESS_ID, req.body.USER_TYPE_ID, req.body.USER_IS_DELETED, req.body.USER_IS_ACTIVE, req.body.USER_DATE_CREATED, req.body.USER_IS_PROFILE_COMPLETED, req.body.USER_PROFILE_ID,  req.body.USER_ID], function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
      });
  });



// delete users
    app.delete('/neerseva/users/:USER_ID', (req, res) => {
    let USER_ID = req.params.USER_ID;    
    connection.query('DELETE FROM `users` WHERE `USER_ID`=?', [USER_ID], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    });
});



// Customers API

// get all customers
app.get('/neerseva/customers', (req, res) => {
  let sql = 'SELECT * FROM customers';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;      
      res.json(results);
  });
});


// Get customer by Id

app.get('/neerseva/customers/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM customers WHERE id = '+ id;
  let query = connection.query(sql, (err, result) => {
      if(err) throw err;
      if(result.length == 0){
        res.json('customers not found');
      }else{
        res.json(result);
      }   
      console.log(result);      
  });
});

//Save customer
app.post('/neerseva/customers', (req, res) => {
  let customers = req.body;
  let sql = 'INSERT INTO customers SET ?';    
  let query = connection.query(sql, customers, (err, result) => {
      if(err) throw err;     
      res.send(result);
  });
});


// update customer
app.put('/neerseva/customers', (req, res) => {
  connection.query('UPDATE `customers` SET  `name` = ?,  `contact` =?, `email` =?, `location` =?, `rating` =?, `image` =?, `delTime` =?, `addressId` =?, `billingInfo` =?  where `id` = ?', [req.body.name, req.body.contact, req.body.email, req.body.location, req.body.rating, req.body.image, req.body.delTime, req.body.addressId, req.body.billingInfo, req.body.id], function (error, results, fields) {
    if(error) throw error;
    res.send(JSON.stringify(results));
    });
});



// delete customers
  app.delete('/neerseva/customers/:id', (req, res) => {
  let id = req.params.id; 
  connection.query('DELETE FROM `customers` WHERE `id`=?', [id], function (error, results, fields) {
  if (error) throw error;
  res.send(results);
  });
});





// Product API

// get all products
app.get('/neerseva/products', (req, res) => {
  let sql = 'SELECT * FROM products';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;      
      res.json(results);
  });
});


// Get products by Id

app.get('/neerseva/products/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM products WHERE id = '+ id;
  let query = connection.query(sql, (err, result) => {
      if(err) throw err;
      if(result.length == 0){
        res.json('products not found');
      }else{
        res.json(result);
      }   
      console.log(result);      
  });
});

//Save products
app.post('/neerseva/products', (req, res) => {
  let products = req.body;
  let sql = 'INSERT INTO products SET ?';    
  let query = connection.query(sql, products, (err, result) => {
      if(err) throw err;     
      res.send(result);
  });
});


// update products
app.put('/neerseva/products', (req, res) => {
  connection.query('UPDATE `products` SET  `name` = ?,  `type` =?, `price` =?, `useInstructions` =?, `code` =?  where `id` = ?', [req.body.name, req.body.type, req.body.price, req.body.useInstructions, req.body.code, req.body.id], function (error, results, fields) {
    if(error) throw error;
    res.send(JSON.stringify(results));
    });
});



// delete products
  app.delete('/neerseva/products/:id', (req, res) => {
  let id = req.params.id; 
  connection.query('DELETE FROM `products` WHERE `id`=?', [id], function (error, results, fields) {
  if (error) throw error;
  res.send(results);
  });
});





// Venodor API

// get all vendors
app.get('/neerseva/vendors', (req, res) => {
  let sql = 'SELECT * FROM vendors';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;      
      res.json(results);
  });
});


// Get vendors by Id

app.get('/neerseva/vendors/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM vendors WHERE id = '+ id;
  let query = connection.query(sql, (err, result) => {
      if(err) throw err;
      if(result.length == 0){
        res.json('vendors not found');
      }else{
        res.json(result);
      }   
      console.log(result);      
  });
});

//Save products
app.post('/neerseva/vendors', (req, res) => {
  let vendors = req.body;
  let sql = 'INSERT INTO vendors SET ?';    
  let query = connection.query(sql, vendors, (err, result) => {
      if(err) throw err;     
      res.send(result);
  });
});


// update products
app.put('/neerseva/vendors', (req, res) => {
  connection.query('UPDATE `vendors` SET  `name` = ?,  `contact` =?, `email` =?, `location` =?, `rating` =?, `image` = ?, `delTime` =?, `isActive` =?, `addressId` =? where `id` = ?', [req.body.name, req.body.contact, req.body.email, req.body.location, req.body.rating, req.body.image, req.body.delTime, req.body.isActive, req.body.addressId, req.body.id], function (error, results, fields) {
    if(error) throw error;
    res.send(JSON.stringify(results));
    });
});



// delete products
  app.delete('/neerseva/vendors/:id', (req, res) => {
  let id = req.params.id; 
  connection.query('DELETE FROM `vendors` WHERE `id`=?', [id], function (error, results, fields) {
  if (error) throw error;
  res.send(results);
  });
});



// Stock API

// get all stocks
app.get('/neerseva/stocks', (req, res) => {
  let sql = 'SELECT * FROM stocks';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;      
      res.json(results);
  });
});


// Get stocks by Id

app.get('/neerseva/stocks/:STOCK_ID', (req, res) => {
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
app.post('/neerseva/stocks', (req, res) => {
  let stocks = req.body;
  let sql = 'INSERT INTO stocks SET ?';    
  let query = connection.query(sql, stocks, (err, result) => {
      if(err) throw err;     
      res.send(result);
  });
});


// update stocks
app.put('/neerseva/stocks', (req, res) => {
  connection.query('UPDATE `stocks` SET  `STOCK_QUANTITY` = ?,  `STOCK_ITEM_ID` =?, `STOCK_DATE_CREATED` =?, `STOCK_IS_AVAILABLE` = ?, `STOCK_IS_DELETED` = ? where `STOCK_ID` = ?', [req.body.STOCK_QUANTITY, req.body.STOCK_ITEM_ID, req.body.STOCK_DATE_CREATED, req.body.STOCK_IS_AVAILABLE, req.body.STOCK_IS_DELETED, req.body.STOCK_ID], function (error, results, fields) {
    if(error) throw error;
    res.send(JSON.stringify(results));
    });
});



// delete stocks
  app.delete('/neerseva/stocks/:STOCK_ID', (req, res) => {
  let STOCK_ID = req.params.STOCK_ID; 
  connection.query('DELETE FROM `stocks` WHERE `STOCK_ID`=?', [STOCK_ID], function (error, results, fields) {
  if (error) throw error;
  res.send(results);
  });
});




// Login and authenticate users

// app.post('/api/authenticate', (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password; 
//   console.log(req.body.email); 
//   console.log(req.body.password); 
//   let sql = 'SELECT * FROM user WHERE email = ''+email+'' and password = ''+password+'' ';      
//   let query = connection.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);      
//     if (result.length > 0) {
//       if(result){
//           res.json(result);
//         }else{
//           res.json(err);      
//         }
//       }
// });
// });



// get all users profile
app.get('/neerseva/profile', (req, res) => {
  let sql = 'SELECT * FROM users_profile';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;       
      res.json(results);
  });
});

//Save user profile
app.post('/neerseva/profile', (req, res) => {
  let users_profile = req.body;
  let sql = 'INSERT INTO users_profile SET ?';    
  let query = connection.query(sql, users_profile, (err, result) => {
      if(err) throw err;     
      res.send(result);
  });
});


// update user_profile
app.put('/neerseva/profile', (req, res) => {
  connection.query('UPDATE `users_profile` SET  `PROFILE_USER_ID` = ?,  `PROFILE_FULLNAME` =?, `PROFILE_USER_NICKNAME` =?, `PROFILE_USER_DOB` = ?, `PROFILE_USER_IMAGE_ID` = ?, `PROFILE_USER_TYPE` = ?, `PROFILE_USER_IS_DELETED` = ?, `PROFILE_USER_SHOP_ID` = ?  where `PROFILE_ID` = ?', [req.body.PROFILE_USER_ID, req.body.PROFILE_FULLNAME, req.body.PROFILE_USER_NICKNAME, req.body.PROFILE_USER_DOB, req.body.PROFILE_USER_IMAGE_ID, req.body.PROFILE_USER_TYPE,  req.body.PROFILE_USER_IS_DELETED, req.body.PROFILE_USER_SHOP_ID, req.body.PROFILE_ID ], function (error, results, fields) {
    if(error) throw error;
    res.send(JSON.stringify(results));
    });
});



// delete user profile
  app.delete('/neerseva/profile/:PROFILE_ID', (req, res) => {
  let PROFILE_ID = req.params.PROFILE_ID; 
  connection.query('DELETE FROM `users_profile` WHERE `PROFILE_ID`=?', [PROFILE_ID], function (error, results, fields) {
  if (error) throw error;
  res.send(results);
  });
});


// get all ITEMS 
app.get('/neerseva/items', (req, res) => {
  let sql = 'SELECT * FROM items';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;       
      res.json(results);
  });
});

//Save items
app.post('/neerseva/items', (req, res) => {
  let items = req.body;
  let sql = 'INSERT INTO items SET ?';    
  let query = connection.query(sql, items, (err, result) => {vcxv
      if(err) throw err;     
      res.send(result);
  });
});


// update user_profile
app.put('/neerseva/items', (req, res) => {
  connection.query('UPDATE `items` SET  `ITEM_NAME` = ?,  `ITEM_CODE` =?, `ITEM_PRICE` =?, `ITEM_MRP` = ?, `ITEM_DISP_PRICE` = ?, `ITEM_DISCOUNT` = ?, `ITEM_TYPE` = ?, `ITEM_DESCRIPTION` = ?,  `ITEM_CAPACITY` = ?, `ITEM_BRAND` = ?, `ITEM_IMAGE_ID` = ?,  `ITEM_DATE_CREATED` = ?, `ITEM_CREATED_BY_USER` = ?, `ITEM_IS_DELETED` = ?, `ITEM_TAX` = ?   where `ITEM_ID` = ?', [req.body.ITEM_NAME, req.body.ITEM_CODE, req.body.ITEM_PRICE, req.body.ITEM_MRP, req.body.ITEM_DISP_PRICE, req.body.ITEM_DISCOUNT,  req.body.ITEM_TYPE, req.body.ITEM_DESCRIPTION, req.body.ITEM_CAPACITY, req.body.ITEM_BRAND, req.body.ITEM_IMAGE_ID, req.body.ITEM_DATE_CREATED, req.body.ITEM_CREATED_BY_USER, req.body.ITEM_IS_DELETED, req.body.ITEM_TAX, req.body.ITEM_ID ], function (error, results, fields) {
    if(error) throw error;
    res.send(JSON.stringify(results));
    });
});



// delete user profile
  app.delete('/neerseva/items/:ITEM_ID', (req, res) => {
  let ITEM_ID = req.params.ITEM_ID; 
  connection.query('DELETE FROM `items` WHERE `ITEM_ID`=?', [ITEM_ID], function (error, results, fields) {
  if (error) throw error;
  res.send(results);
  });
});