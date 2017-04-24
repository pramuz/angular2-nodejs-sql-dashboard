var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();
//Start Database Configuration 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});
//End Database Configuration 
connection.connect(function(error){
    if(!!error){
        console.log('Error')
    } else{
        console.log('Connected');
    }
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req,res,next){
  var _send = res.send;
  var sent = false;
  res.send = function(data){
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
};
  next();
});
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept");
    next();
});
var  executeQuery = function(resp, query){             
     connection.query(query,function(error,rows,fields){
            if(!!error){
                    console.log('Error Query')
                } else{
                    console.log('Success');
                   
                    resp.send(rows)
                }
    })
}
app.get('/app',function(req,resp){
     var query = "Select * from personslist";
     executeQuery (resp, query);
});
app.get('/app/:id',function(req,resp){
  var dataSend={status:true}
  var dataSendError={status:false}
  var values = req.params.id;
  var query = "delete from personslist where PersonID = ?";
                connection.query(query,values,function(error,rows,fields){
            if(!!error){
                    console.log('Error Query')
                    resp.send(dataSendError)   
                } else{
                    console.log('Success');                  
                    resp.send(dataSend)                    
                }
    })
});
app.post('/app/person',function(req,resp){
     resp.send(req.body)
var values = req.body;
   var query = "INSERT INTO personslist SET ?";
     connection.query(query,values,function(error,rows,fields){
            if(!!error){
                    console.log('Error Query')
                } else{
                    console.log('Success');                  
                    resp.send(rows)                    
                }
    })
});
app.listen(4442);
