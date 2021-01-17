const express=require('express')
const app=express();
const server=require('http').createServer(app)
const io=require('socket.io')(server);
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
app.use(express.static(__dirname+'/public'));
app.use(express.json())//bodyparser
app.use(cookieParser())
const connect=require('./mongoose.js');
connect();
const authroutes=require('./routes/routes.js')
const accesscheck=require("./routes/accesscheck.js")
app.use('/api',authroutes)
app.use('/api',accesscheck)



io.on('connection',(socket)=>{
    console.log("connect open")
    socket.on('name',(name)=>{
        console.log("Connected with"+name);
    })
})


server.listen(process.env.PORT||3000,()=>{
    console.log("up and running at 3000");
})
