// import React, { useState } from 'react';
// import './paymentBusinessman.css';
// import { useNavigate } from 'react-router-dom';

// const PaymentBusinessman = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         amount: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handlePayment = () => {
//         const { name, email, phone, amount } = formData;

//         if (!name || !email || !phone || !amount) {
//             alert('Please fill in all fields before proceeding.');
//             return;
//         }

//         // Simulate payment process
//         localStorage.setItem('paymentStatus', 'completed');
//         alert('Payment Successful! Redirecting to Contact Businessman...');
//         navigate('/ContactBusinessman');
//     };

//     return (
//         <div className="BMan-container">
//             <div className="t1-container">
//                 <h2 className="business-info">Businessman's Payment</h2>

//                 <div className="input-group">
//                     <label htmlFor="name">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Enter your name"
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label htmlFor="email">Email Address:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Enter your email"
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label htmlFor="phone">Phone Number:</label>
//                     <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="Enter your phone number"
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label htmlFor="amount">Amount:</label>
//                     <input
//                         type="number"
//                         id="amount"
//                         name="amount"
//                         value={formData.amount}
//                         onChange={handleChange}
//                         placeholder="Enter amount"
//                     />
//                 </div>

//                 <button className="pay-button" onClick={handlePayment}>Pay Now</button>
//             </div>
//         </div>
//     );
// };

// export default PaymentBusinessman;













 
// PaymentBusinessman.jsx
import React, { useState } from 'react';
import './paymentBusinessman.css';
import { useNavigate } from 'react-router-dom';

const PaymentBusinessman = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        amount: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle payment
    const handlePayment = () => {
        const { name, email, phone, amount } = formData;

        if (!name || !email || !phone || !amount) {
            alert('Please fill in all fields before proceeding.');
            return;
        }

        // Simulate successful payment
        localStorage.setItem('paymentStatus_Businessman', 'completed');
        
        alert('Payment Successful! Redirecting to Contact Businessman...');

        // Ensure navigation occurs after localStorage update
        navigate('/ContactBusinessman');
    };

    return (
        <div className="BMan-container">
            <div className="t1-container">
                <h2 className="business-info">Businessman's Payment</h2>

                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        required
                    />
                </div>

                <button className="pay-button" onClick={handlePayment}>
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default PaymentBusinessman;
