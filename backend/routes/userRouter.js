const express=require('express');
const router=express.Router();
const {userSchema,updateBody}=require('../Types/index');
const {User,Account}=require('../db/db');
const JWT_SECRET=require('../config');
const jwt = require('jsonwebtoken');
const { userMiddleware ,checkMiddleware} = require('../middleware/userAuth');
// const {z}=require("zod");
// // import {z} from 'zod';

// const userSchema=z.object({
//     firstName:z.string(),
//     lastName:z.string(),
//     password:z.string(),
//     email:z.string().email(),
// });

router.post('/signup',async(req,res)=>{
    const validUser=req.body;
    // input validation using zod library
    const valid=userSchema.safeParse(validUser);
    
    if(!valid.success){
        return res.status(400).json({
            Success:"False",
            msg:"Wrong input !!"
        })
    }
    
    // checking if already user exist with the same email
    const userinDB=await User.findOne({
        email:validUser.email,
    });
    
    if(userinDB){
        return res.status(400).json({
            msg:"User Email Already Exist in our DataBase"
        });
    }

    // creating an instance of user in database
    const user=await User.create({
        firstName:validUser.firstName,
        lastName:validUser.lastName,
        password:validUser.password,
        email:validUser.email,
    });
    const userId=user._id;
    await Account.create({
        userId:userId,
        balance:Math.floor(Math.random()*10000+1)
    })
    // creating jwt for the created user
    const token=jwt.sign({userId},JWT_SECRET);
    res.json({
        Success:"true",
        msg:"User id is Created",
        token:token
    });
})

router.post('/signin',async(req,res)=>{
    // const {email,password}=req.body;
    const email=req.body.email;
    const password=req.body.password;
    try{
        const user=await User.findOne({
            email:email,
        });
        // console.log(user.email);
        if(!user || user.password!==password){
            return res.status(401).json({
                message:"Invalid username and Password "
            });
        }
        const token=jwt.sign({userId:user._id},JWT_SECRET);
        res.status(200).json({
            token:token,
        });
    }catch(err){
        res.status(500).json({
            message:"Something wrong with the input(wrong E-mail and password) !"
        })
    }
  
});

router.put('/update',userMiddleware,async (req,res)=>{

    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({
            message:"Error while updating the information"
        });
    }
    const updateField=req.body;

    await User.updateOne({_id:req.userId},{
        $set:updateField
    });
    res.json({
        message:"Updated Succesfully"
    })
});
router.get("/me",userMiddleware,async(req,res)=>{
    const userId=req.userId;
    const user=await User.findById(userId);
    if(!user ){
        return res.status(401).json({
            message:"User Not Exist"
        })
    }
    const balance=await Account.findOne({
        userId:userId,
    })
    if(!balance){
        return res.status(401).json({
            message:"User Dont Hava Enough Balance"
        })
    }
    res.json({
        detail:{
            name:user.firstName,
            amount:balance.balance,
            id:user._id
        }
    })
})
router.get('/bulk',async(req,res)=>{
    const filter=req.query.filter || "";
    // return the user details based on the query parameter
    const users=await User.find({
        $or:[{
            firstName:{
                $regex:filter
            }
        },{
            lastName:{
                $regex:filter
            }
        }]
    });
    const mappedUser=users.map(user=>({
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
    }))
    res.json({
        user:mappedUser
    }) 
})
module.exports=router;
