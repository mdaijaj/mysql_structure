const express=require("express");
var bodyParser=require("body-parser")
var mysql=require("mysql")	
const redis=require("redis")			

var app=express();									

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//database connected
var connection=mysql.createConnection({
	host: "localhost",
	user: "root",   
	password: "aijaj123",
	database: "redis"
})

connection.connect((err)=>{
    if(!err){
        console.log("dataabase connected successfully!")
    }else{
        console.log("unable to connect please check again....")
    }
});

//connect redis cache client with local
redis_port=6379
const client=redis.createClient(redis_port)   
    client.on('error', (err)=>{
        console.log("client unable to connect redis", err);
    })

// // // this is only for routes or routers
var router=express.Router();
app.use('/', router)
require('./routes')(router,connection,redis,client)


var port=2050 ;
app.listen(port,()=>{
	console.log("server is running",port);
});