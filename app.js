

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();


app.use("/public", express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/SignIn.html");
});



app.post("/", function(req, res){

  var fName = req.body.fName;
  var Email1 = req.body.Email1;
  var Pword = req.body.Pword;

  var data = {
    members: [
      {
        email_address: Email1,
      status: "subscribed",
      merge_fields: {
        LNAME: fName
      },
    }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/4716d3f91f",
    method: "POST",
    headers: {
      "Authorization": "Gifts1 b98f031831da5803d075723dec231be5-us4"
    },
    body: jsonData
  };

request(options, function(error, response, body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }}
});

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});



// b98f031831da5803d075723dec231be5-us4  API Key

// 4716d3f91f  List ID
