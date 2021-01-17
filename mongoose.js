const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config();
function mongooseconn(){

    const connParam={
        useUnifiedTopology:true,useFindAndModify:true,useCreateIndex:true,useNewUrlParser:true
    }
    mongoose.connect(process.env.db_connect,connParam)
        .then(()=>{
        console.log("Success DB")
        })
        .catch(err=>{
        console.log(err)
        })
}

module.exports=mongooseconn;

