const express = require('express')
const app = express()
const port = 10418;
const studentInfoFilename = 'student_info.json';
var fs = require("fs");
var studentInfoObj = fs.readFileSync(studentInfoFilename);
var studentInfo = JSON.parse(studentInfoObj);

function findItem(target, studentInfo){
  for(item in studentInfo)
    if(target == item)
      return true;
  return false;
}

app.use(express.static(__dirname + '/public'))
console.log("Prepare done");

app.get("/search_student_send", function(req, res){
  console.log("Get search_student request");
  if(findItem(req.query.student_id, studentInfo)){
    res.send(`Hello, ${studentInfo[req.query.student_id]}`);
    console.log(`ID=${req.query.student_id} Name=${studentInfo[req.query.student_id]} Login`);
  }
  else{
    res.send(`ID= ${req.query.student_id} not found`);
    console.log(`ID=${req.query.student_id} try to login but not found`);
  }
})

app.get("/list_student_req", function(req, res){
  console.log("Get list_student request");
  var str = '';
  for(item in studentInfo)
    str += item + ':' + studentInfo[item] + "<br>\n";
  console.log(str);
  res.send(str);
})
app.get("/add_student_req", function(req, res){
  console.log("Get add_student request");
  if(findItem(req.query.student_id, studentInfo))
    var messages = (`Student ID= ${req.query.student_id}, name= ${studentInfo[req.query.student_id]} already found`);
  else{
    studentInfo[req.query.student_id] = req.query.student_name;
    var messages = (`Student ID= ${req.query.student_id}, name= ${studentInfo[req.query.student_id]} added successfully`);
  }
  res.send(messages);
  console.log(messages);
 })

app.get("/del_student_req", function(req, res){
  console.log("Get del_student request");
  if(findItem(req.query.student_id, studentInfo)){
    var messages = (`Student ID= ${req.query.student_id}, name= ${studentInfo[req.query.student_id]} deleted`);
    delete studentInfo[req.query.student_id];
  }
  else
    var messages = (`Student ID= ${req.query.student_id}, name= ${studentInfo[req.query.student_id]} not found`);
  res.send(messages);
  console.log(messages);
})

app.listen(port)
