// import './paymentInvestor.css';

// const paymentInvestor = () => {
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
//         navigate('/ContactInvestor');
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

// export default paymentInvestor;







 








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './paymentInvestor.css';

const PaymentInvestor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        amount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePayment = () => {
        const { name, email, phone, amount } = formData;

        if (!name || !email || !phone || !amount) {
            alert('Please fill in all fields before proceeding.');
            return;
        }

        
         localStorage.setItem('investorPaymentStatus', 'completed');
        alert('Payment Successful! Redirecting to Contact Investor...');
        navigate('/ContactInvestor');
    };

    return (
        <div className="BMan-container">
            <div className="t1-container">
                <h2 className="business-info">Investor's Payment</h2>

                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
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
                    />
                </div>

                <button className="pay-button" onClick={handlePayment}>Pay Now</button>
            </div>
        </div>
    );
};

export default PaymentInvestor;
