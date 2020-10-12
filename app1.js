

if (process.env.NODE_ENV !== 'production') require('dotenv').config()



const stripe = require('stripe')("sk_live");
const express = require('express');
const app = express();
const mysql = require('mysql');

const stripePublicKey ="pk_live";

const request = require("request");
const bodyParser = require("body-parser");

const https = require('https');
const fs = require('fs');

const ejs = require('ejs');
const session = require('express-session');
const mongoose = require("mongoose");






stripeSecretKey="sk_live_5rWaDPj0xlmQxsXTdybEcvTc00M3FlafR4";


// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'dollabea_dollabeal',
    password : 'LearnEarn22@',
    database : 'dollabea_UserDb'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});



app.set('view engine','ejs')
app.use(express.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}));








app.get('/', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('index.ejs', {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data)
      })
    }
  })
})

app.post('/purchase', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      const itemsJson = JSON.parse(data)
      const itemsArray = itemsJson.grinders
      let total = 0
      req.body.items.forEach(function(item) {
        const itemJson = itemsArray.find(function(i) {
          return i.id == item.id
        })
        total = total + itemJson.price * item.quantity
      })

      stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'usd'
      }).then(function(charge) {
        console.log('Charge Successful')
        res.json({ message: 'Successfully purchased items' })
      }).catch(function() {
        console.log('Charge Fail')
        res.status(500).end()
      })
    }
  })
})




app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
