const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const ejs=require('ejs');
const { static } = require('express');
const data=require(__dirname+'/data.js');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/TodolistDB', {useNewUrlParser: true});

const db=mongoose.connection;

const customListScheame=new mongoose.Schema({
name:String,
item:[]
});



db.on('open',function(){
  console.log('working');
});

const TodolistScheame=new mongoose.Schema({
name:{
  type:String,
  required :true
}
});

const TodolistModel=new mongoose.model('todolist',TodolistScheame);
const workItemModel=new mongoose.model('workitem',TodolistScheame);

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/work',function(req,resp){
workItemModel.find({},function(err,workitems){
  resp.render('list',{newitem:workitems,title:"WORK"});
});
});

app.get('/',function(req,resp)
{
  var x=data.getDate();
  const todoitem=TodolistModel.find({},function(err,todolists){
    resp.render("list",{newitem:todolists,title:x});
  });
  
});


app.post('/',function(req,resp)
{
   
  var title=req.body.btn;

  if(title=="WORK")
  {
      const workitemname=req.body.item;
      console.log(workitemname);
      const workitem=new workItemModel({name:workitemname});
      workitem.save();
      resp.redirect('/work');
  }
  else
  {
  const todoitemname=req.body.item;
  const todoitem=new TodolistModel({name:todoitemname});
todoitem.save();
  resp.redirect('/');
  }


});

app.post('/Delect',function(req,resp){
TodolistModel.findByIdAndRemove(req.body.checkbox,function(err){

 if(!err){
  resp.redirect('/');
 } else {
   console.log("Working Fine");
 }

});
});


app.listen(3000,function(req,resp){
  console.log("Port is Working");
});

app.get('/:customListName',function (req,resp) {
  const customListName=req.params.customListName;
    resp.render('list',{title:customListName});
    
});
 


