const express=require('express');
const { userMiddleware } = require('../middleware/userAuth');
const { Account } = require('../db/db');
const { default: mongoose } = require('mongoose');
const { setErrorMap } = require('zod');
const router=express.Router();

router.get('/balance',userMiddleware,async(req,res)=>{
    // authenticate the user
    const account=await Account.findOne({
        userId:req.userId,
    });
    res.status(200).json({
        Balance:account.balance
    });
});

// Task is to send Money from one user to another user
// who can send : logic says The user who is logged in already 
// so we can use userAuthenticateMiddleware for this 
// Have to make sure that the changes should be reflected in both the 
// user sender and the receiver at the same time.
// it should not happen that sender has sended the money and it's balance is not updated
// those sort of scenario's where it is required some task to be finished
// completely. if task is partially completed in this case then the bank could go in loss
// in real scenario. So it is good to use the Concept of Transactions in databases.
// key points 1> Which ensures the any Task to be completed fully. it aborts/rollback the whole Task
// when Task is partially completed not fully by any reason.
// key points 2> if during the Transaction a data is read already and somehow if the same 
// data is read again then the Transaction will abort/Fail... because as per this example
// it cuts the chance of fooling the endpoint by sending the request immediately after one
// so, it can fool the logic while The Transaction is hung somewhere because of Await...

router.post('/Transfer',userMiddleware,async (req,res)=>{
    const session=await mongoose.startSession();

    try{
        
        session.startTransaction();
        const {amount,to}=req.body;
        // cheking sender is valid and does it has enough amount to send others
        const account=await Account.findOne({
            userId:req.userId,
        }).session(session);
        if(!account || account.balance<amount){
            session.abortTransaction();
            return res.status(400).json({
                message:"Insufficient balance"
            });
        }
        // find the user whom to send the money
        const toUserId=Account.findOne({
            userId:to
        }).session(session);
        if(!toUserId){
            session.abortTransaction();
            return res.status(400).json({
                message:"User Does Not Exist"
            })
        }
        // Transfer 
        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
        await Account.updateOne({userId:to},{$inc:{balance:+amount}}).session(session);
        await session.commitTransaction();
        res.json({
            message:"Transfer Successfull"
        });

    }catch(err){
        console.error(err);
    }
})
module.exports=router;