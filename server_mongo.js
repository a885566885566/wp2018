/* Server */
const express = require('express');
const app = express()
const port = 10418;
/* Database */
const config = require('./config');
const mongoose = require('mongoose');
const url = `mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}`;
mongoose.connect(url);
mongoose.Promise = global.Promise;

const collectionName = 'ajax_task';
var schema = new mongoose.Schema({
  sid: String,
  sname: String
});
var student_model = mongoose.model(collectionName, schema);

var ori = [
  {sid:"E123456789", sname:"Amy"},
  {sid:"E445678891", sname:"Bob"},
  {sid:"F452136975", sname:"Cathy"},
  {sid:"H785631492", sname:"Dora"},
  {sid:"A147895631", sname:"Elsa"},
  {sid:"F759314862", sname:"Frank"},
  {sid:"D456217986", sname:"Gina"},
  {sid:"K567812463", sname:"Helen"},
  {sid:"E436975123", sname:"Irene"},
  {sid:"G789631546", sname:"Jack"},
  {sid:"Z178934564", sname:"Kelly"},
  {sid:"Q864130759", sname:"Lisa"},
  {sid:"R759114233", sname:"Mike"},
  {sid:"Q785321256", sname:"Nick"},
  {sid:"E781344459", sname:"Opera"},
  {sid:"F100234798", sname:"Penny"},
  {sid:"W744411551", sname:"Question"}];

/* Construct Initial Database*/
function initialize(){
  student_model.remove({}, (err)=>{
    if(err) console.log('Remove error: ', err);
    else{
      student_model.insertMany(ori, function(err){
      if(err) console.log('Insert data error: ', err);
      else    console.log('Insert data sucess');
    })
  }})
}

/* Program start */
app.use(express.static(__dirname + '/public'))
console.log("Prepare done");
//initialize();
app.get("/search_student_send", function(req, res){
  console.log("Get search_student request");
  student_model.find({'sid': req.query.student_id}, (err, student)=>{
    if(err) var msg = 'Find Students error: ', err;
    else if(student.length<=0) var msg = `ID= ${req.query.student_id} not found`;
    else    var msg = `Hello, ${student[0].sname}`;
    console.log(msg);
    res.send(msg);
  })
})

app.get("/list_student_req", function(req, res){
  console.log("Get list_student request");
  student_model.find({}, function(err, students){
    var str = '';
    for(i in students)
      str += students[i].sid +':' + students[i].sname +'<br>\n';
    console.log(str);
    res.send(str);
  })
})
app.get("/add_student_req", function(req, res){
  console.log("Get add_student request");
  student_model.find({'sid': req.query.student_id}, (err, student)=>{
    if(err) var msg = 'Find Students error: ', err;
    else if(student.length<=0){ 
      student_model.insertMany([{'sid':req.query.student_id,'sname':req.query.student_name}], (err)=>{
        if(err) console.log('Add Student error')});
      var msg = `Student ID= ${req.query.student_id}, name= ${req.query.student_name} added successfully`;
    }
    else    var msg = `ID= ${req.query.student_id} already exist, with name = ${student[0].sname}`;
    console.log(msg);
    res.send(msg);
  })
 })

app.get("/del_student_req", function(req, res){
  console.log("Get del_student request");
  student_model.find({'sid': req.query.student_id}, (err, student)=>{
    if(err) var msg = 'Find Students error: ', err;
    else if(student.length<=0) var msg = `ID= ${req.query.student_id} not found`;
    else {
      student_model.deleteOne({'sid':req.query.student_id}, (err)=>{
        if(err) console.log('Remove error: ', err)});
      var msg = `Student ID= ${req.query.student_id} deleted successfully.`;
    }
    console.log(msg);
    res.send(msg);
  })
})

app.listen(port)
