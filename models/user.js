const mongoose=require('mongoose')

const userschema= new mongoose.Schema({
    name: {
        type:String,
        required:true,
        max:255,
        min:5
    },

    email:{
        type:String,
        required:true,
        max:1024,
        min:5
    },

    password:{
        type:String,
        required:true,
        max:1024,
        min:8
    }
});

module.exports = mongoose.model('User',userschema);