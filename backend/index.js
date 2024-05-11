
const express=require('express');
const app=express();
const mainRouter=require('./routes/mainRouter');
const cors=require('cors');

const port=3000;
app.use(express.json());
app.use(cors());
app.use('/api/v1',mainRouter);
app.listen(port,()=>{
    console.log("Server is Listening at "+port);
});