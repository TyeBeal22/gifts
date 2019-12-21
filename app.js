

require('dotenv').config()


const stripeSecretKey = process.env.Stripe_Secret_Key
const stripePublicKey = process.env.Stripe_Public_Key
const express = require('express');
const app = express();
const request = require("request");
const bodyParser = require("body-parser");




const fs = require('fs')
const stripe = require('stripe')(stripeSecretKey)
app.set('view engine','ejs')
app.use(express.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}));




app.get('/index', function(req, res) {
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
      }).then(function() {
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
