const express=require('express')
const router=express.Router()
const {checkout,paymentVerification,getKey}=require('../controllers/paymentController')

router.post('/checkout',checkout)
router.post('/paymentVerification',paymentVerification)
router.get('/getKey',getKey)

module.exports=router
 