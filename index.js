// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

require('dotenv').config(); 

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  let date;
  if (!isNaN(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: Math.floor(date.getTime()), 
    utc: date.toUTCString(), 
  });
});

app.get('/api/',(req,res)=>{
  let date = new Date(); 
  return res.json({
    unix: Math.floor(date.getTime()), 
    utc: date.toUTCString(), 
  });

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
