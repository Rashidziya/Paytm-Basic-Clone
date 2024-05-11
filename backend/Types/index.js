
const {z}=require("zod");
// import {z} from 'zod';

const userSchema=z.object({
    firstName:z.string(),
    lastName:z.string(),
    password:z.string(),
    email:z.string().email(),
});


const updateBody=z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()
})

module.exports={
    userSchema,
    updateBody,
}