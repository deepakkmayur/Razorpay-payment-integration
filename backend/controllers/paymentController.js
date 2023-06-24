const Razorpay = require('razorpay');
const env = require('../env')
const crypto = require('crypto');
const Payment = require("../models/paymentModel")

const instance = new Razorpay({
  key_id: env.RAZORPAY_ID,
  key_secret: env.RAZORPAY_SECRET_KEY
});


const checkout = async (req, res) => {
  console.log(req.body, "-----req.body checkout-------------------------");
  if (req.body.Amount != '') {
    try {
      const options = {
        amount: Number(req.body.Amount) * 100,
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      console.log(order, "/////////order////////////");
      if (order) {
        res.status(200).json({ order })
      } else {
        res.status(400).json({ success: false })
      }
    } catch (error) {
      console.log("//////////catch");
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json("enter the amount")
  }
}



const paymentVerification = async (req, res) => {
  console.log(req.body);
  const generated_signature = crypto.createHmac('sha256', env.RAZORPAY_SECRET_KEY)
    .update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id)
    .digest('hex')

  if (generated_signature === req.body.razorpay_signature) {
    await Payment.create({ order_id: req.body.razorpay_order_id, payment_id: req.body.razorpay_payment_id }).then(() => {
      res.status(200).json("success")
    }).catch((err) => {
      console.log("Error while saving the document:", error);
      res.status(500).json(err)
    })
  } else {
    res.status(400).send('Invalid signature');
  }
}


const getKey = (req, res) => {
  res.status(200).json({ key: env.RAZORPAY_ID })
}


module.exports = { checkout, paymentVerification, getKey }

