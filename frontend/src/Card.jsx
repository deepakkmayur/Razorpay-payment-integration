import React, { useState } from 'react'
import axios from 'axios'
import './Card.css'
// import Razorpay from 'razorpay';

const Card = () => {
const [amount,setAmount]=useState(0)
const inputHandler=(e)=>{
   setAmount(e.target.value)
}

   const formSubmitHandler=async(e)=>{
      e.preventDefault()  
   
      try {
         const getKeyResponse=await axios.get('http://localhost:3003/getKey')
         const response = await axios.post('http://localhost:3003/checkout', { Amount: amount });   
         console.log("///////",response.data); // Access the response data
            console.log(getKeyResponse.data.key,"getKeyResponse");  
            let ID=response.data.order.id
            let AMOUNT=response.data.order.amount
            let RAZORPAY_ID=getKeyResponse.data.key

            var options = {
               key:RAZORPAY_ID, 
               amount: AMOUNT,
               order_id:ID  , //This is a sample Order ID. Pass the `id` obtained in the response 
               currency: "INR",
               name: "Deepak km",
               description: "Test Transaction ",
               image: "https://example.com/your_logo",   
               callback_url: "http://localhost:3003/paymentVerification",
               prefill: {
                   name: "Gaurav Kumar",
                   email: "gaurav.kumar@example.com",
                   conact: "9000090000"
               },
               notes: {
                   "address": "Razorpay Corporate Office"
               },
               theme: {
                   "color": "#3399cc"
               }
           };
           const razor = new window.Razorpay(options);
           razor.open(); 
       } catch (error) {
         console.error(error); // Log the error response        
       }
   }


  return (
    <div className='main'>
      <div className='formDiv'>
      <form onSubmit={formSubmitHandler}>
         <input type="number" name='amount' placeholder='Amount' onChange={inputHandler} value={amount}/>
         <button type='submit'>Pay</button>
      </form>
      </div>
    </div>
  )
  }

export default Card


// import React, { useState } from 'react';
// import axios from 'axios';

// const Card = () => {
//   const [amount, setAmount] = useState('');

//   const inputHandler = (e) => {
//     setAmount(e.target.value);
//   };

//   const formSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3003/checkout', { amount });
//       console.log(response.data.orderId);
//       // Use the generated order ID in your application
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={formSubmitHandler}>
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           onChange={inputHandler}
//           value={amount}
//         />
//         <button type="submit">Create Order</button>
//       </form>
//     </div>
//   );
// };

// export default Card;
