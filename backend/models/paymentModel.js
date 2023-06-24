const mongoose=require('mongoose')

const paymentSchema=mongoose.Schema({
   order_id:{
      type:String,
      required:true
   },
   payment_id:{
      type:String,
      required:true
   }
})


const paymentModel=mongoose.model("payment",paymentSchema)

module.exports=paymentModel