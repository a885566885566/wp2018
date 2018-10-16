const express = require('express')
const app = express()
const port = 10418

app.use(express.static(__dirname + '/public'))
//app.get('/', function(req, res) {
//  res.send('<h1>Hello, ${req.query.student_id}')})
console.log("Prepare done");
var words = 'words';
app.get("/search_student_send", function(req, res){
  console.log("Get search_student request");
  res.send(`Hello, ${req.query.student_id}`)
  console.log(`${req.query.student_id} ${words} Data sent`);
})
app.get("/list_student_req", function(req, res){
  console.log("Get list_student request");
  res.send("data data");
})
app.listen(port)
