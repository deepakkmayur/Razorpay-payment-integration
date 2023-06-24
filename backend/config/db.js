const mongoose=require('mongoose')


const dbConnect=()=>{

   mongoose.connect("mongodb://127.0.0.1:27017/RAZORPAY")
   .then(()=>{
      console.log("db connected successfully");
   })
   .catch((err)=>{
      console.log("db connection error",err);
   })
}

module.exports=dbConnect