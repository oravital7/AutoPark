/*server*/
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
var express = require('express');
var mysql = require('mysql');
var mysql2 = require('mysql2');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'autopark'
  
});
var app =express();
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
  extended: true
}));

var point=[] //saving the Geo point sending to the server.
app.post('/api/' , (req,res) => {
console.log('the server got a new req');
console.log(req.body);
const data =req.body;
point.push({lat:data.lat, lon:data.lon})
console.log(point);
//Returning all parking at most 2 km away from the location of the req.
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT *  FROM parking  where 111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(parking.lat))* COS(RADIANS(?))* COS(RADIANS(parking.lon - ?))+ SIN(RADIANS(parking.lat))* SIN(RADIANS(?))))) <5.0",[data.lat,data.lon,data.lat],function (err, result, fields) {
    if (err) throw err;
    console.log(JSON.stringify(result));
  });
});
//need to send result of sql query back to the client in json format.
res.end();	
//res.JSON()	
	
});

 app.listen(3000,()=>{
	console.log('running on port 3000');
})
