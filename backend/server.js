const express=require('express')
const dotenv=require('dotenv').config()
const env=require('./env')
const cors=require('cors')
const paymentRoute=require('./routes/paymentRoute')
const dbConnect=require("./config/db")
const app=express()

dbConnect()
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use('/',paymentRoute)

app.listen(env.PORT,()=>{
   console.log(`server listening on port :${env.PORT}`);
})
