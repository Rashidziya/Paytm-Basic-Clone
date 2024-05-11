const mongoose=require('mongoose');
const { string, number } = require('zod');
mongoose.connect("mongodb+srv://Rashid_ziya:ziya123@firstmongocluster.cvtu1hx.mongodb.net/Paytm-Project");

const userScehma=new mongoose.Schema({
    firstName:String,
    lastName:String,
    password:String,
    email:String
});

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    balance:{
        type:Number,
        required:true
    }
})
const User= mongoose.model("user",userScehma);
const Account=mongoose.model("Account",accountSchema);
module.exports={
    User,
    Account,
}