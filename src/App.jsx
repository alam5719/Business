


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// import Navbar from "./Components/Navbar/Navbar";
// import Login from "./Components/Navbar/Login";
// import Signup from "./Components/Navbar/Signup";
// import PostBusiness from "./Components/Navbar/PostBusiness";
// import ReviewPage from "./Components/Navbar/ReviewPage";
// import ContactPage from "./Components/Navbar/contactPage";
// import BusinessMan from "./Components/Navbar/BusinessMan";
// import ViewBusinesses from "./Components/Navbar/ViewBusinesses";

// import Bids from "./Components/Navbar/Bids";
// import ViewBusinesses1 from "./Components/Navbar/ViewBusinesses1";
// import ContactInvestor from "./Components/Navbar/ContactInvestor";
// import ContactBusinessman from "./Components/Navbar/ContactBusinessman";

// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import s1 from "./assets/s1.jpg";
// import s2 from "./assets/s2.webp";
// import s3 from "./assets/s3.webp";
// import s4 from "./assets/s4.webp";
// import s5 from "./assets/s5.webp";

// import telstra from "./assets/telstra.svg";
// import ibm from "./assets/ibm.svg";
// import google from "./assets/google.svg";
// import airbus from "./assets/airbus.svg";
// import fujistu from "./assets/fujistu.svg";
// import nasa from "./assets/nasa.webp";

// const images = [s1, s2, s3, s4, s5];

// const Home = ({ isLoggedIn, userType }) => {
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   console.log("🏠 Home Component: isLoggedIn:", isLoggedIn);
//   console.log("🏠 Home Component: userType:", userType);

//   const handleNavigation = (path) => {
//     if (isLoggedIn) {
//       navigate(path);
//     } else {
//       navigate("/login");
//     }
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   return (
//     <div className="app-container">
//       <div className="image-slideshow">
//         <button className="prev-button" onClick={prevSlide}>
//           ❮
//         </button>
//         <img
//           src={images[currentIndex]}
//           alt="Slideshow"
//           className="slideshow-image"
//         />
//         <button className="next-button" onClick={nextSlide}>
//           ❯
//         </button>
//       </div>

//       <div className="logo-collection">
//         <img src={telstra} alt="Telstra" />
//         <img src={ibm} alt="IBM" />
//         <img src={google} alt="Google" />
//         <img src={airbus} alt="Airbus" />
//         <img src={fujistu} alt="Fujistu" />
//         <img src={nasa} alt="NASA" />
//       </div>

//       <div className="button-container">
//         <button className="Button" onClick={() => handleNavigation("/")}>
//           Invest
//         </button>
//         <button className="Button1" onClick={() => handleNavigation("/contactPage")}>
//           Create Investor Profile
//         </button>

          
      
          
          
 
//           <button className="Button2" onClick={() => navigate("/ContactBusinessman")}>
//             Contact Businessman
//           </button>
 


   
//           <button className="Button3" onClick={() => navigate("/ContactInvestor")}>
//             Contact Investor
//           </button>
         
//       </div>
//     </div>
//   );
// };



// const Footer = () => (
//   <footer className="foot">
//     <div className="footer-container">
//       <span className="foo">
//         {/* <a href="https://www.freelancer.com/job/">Categories</a> */}
//         <a href="">Categories</a>
//       </span>
//       <span className="foo">
//         <a href="">About us</a>
//       </span>
//       <span className="foo">
//         <a href="">Privacy Policy</a>
//       </span>
//       <span className="foo">
//         <a href="">Escrow.com</a>
//       </span>
//     </div>
//   </footer>
// );




// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userType, setUserType] = useState("");

//   useEffect(() => {
//     console.log("🔄 Checking login status...");
  
//     const token = localStorage.getItem("token");
//     const storedUserData = localStorage.getItem("userData");
  
//     setIsLoggedIn(!!token);
//     console.log("🔑 isLoggedIn:", !!token);
  
//     if (storedUserData) {
//       try {
//         const parsedData = JSON.parse(storedUserData);
//         console.log("📦 Parsed user data:", parsedData);
        
//         if (parsedData?.role) {
//           setUserType(parsedData.role);
//           console.log("✅ User Type Set:", parsedData.role);
//         } else {
//           console.warn("⚠️ User Role Not Found in Parsed Data");
//         }
//       } catch (error) {
//         console.error("❌ Error parsing user data:", error);
//       }
//     } else {
//       console.warn("⚠️ No userData found in localStorage");
//     }
//   }, []);

//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
//         <Route path="/" element={<Home isLoggedIn={isLoggedIn} userType={userType} />} />
//         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/postbusiness" element={isLoggedIn ? <PostBusiness /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/review" element={isLoggedIn ? <ReviewPage /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/contactPage" element={isLoggedIn ? <ContactPage /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/BusinessMan" element={isLoggedIn ? <BusinessMan /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/view-businesses" element={<ViewBusinesses />} />
//         <Route path="/view-businesses/:id" element={<ViewBusinesses1 />} />

//         <Route path = "/bids" element={<Bids/>} />

//         <Route path="/contactInvestor" element={isLoggedIn ? <ContactInvestor /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/contactBusinessman" element={isLoggedIn ? <ContactBusinessman /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// };

// export default App;








import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Navbar/Login";
import Signup from "./Components/Navbar/Signup";
import PostBusiness from "./Components/Navbar/PostBusiness";
import ReviewPage from "./Components/Navbar/ReviewPage";
import ContactPage from "./Components/Navbar/ContactPage";
import BusinessMan from "./Components/Navbar/BusinessMan";
import ViewBusinesses from "./Components/Navbar/ViewBusinesses";
import Bids from "./Components/Navbar/Bids";
import ViewBusinesses1 from "./Components/Navbar/ViewBusinesses1";
import ContactInvestor from "./Components/Navbar/ContactInvestor";
import ContactBusinessman from "./Components/Navbar/ContactBusinessman";
import PaymentBusinessman from "./Components/Navbar/PaymentBusinessman";
import PaymentInvestor from "./Components/Navbar/PaymentInvestor";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Image Imports
import s1 from "./assets/s1.jpg";
import s2 from "./assets/s2.webp";
import s3 from "./assets/s3.webp";
import s4 from "./assets/s4.webp";
import s5 from "./assets/s5.webp";

import telstra from "./assets/telstra.svg";
import ibm from "./assets/ibm.svg";
import google from "./assets/google.svg";
import airbus from "./assets/airbus.svg";
import fujistu from "./assets/fujistu.svg";
import nasa from "./assets/nasa.webp";

import Rambler from "./assets/Rambler.avif";

const images = [s1, s2, s3, s4, s5];

const Home = ({ isLoggedIn, userType, isBusinessmanPaid, isInvestorPaid }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Updated Navigation Logic (Checks both payment statuses)
  const handleNavigation = (path) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (path === "/ContactBusinessman" && !isBusinessmanPaid) {
      navigate("/paymentBusinessman");
      return;
    }

    if (path === "/ContactInvestor" && !isInvestorPaid) {
      navigate("/paymentInvestor");
      return;
    }

    navigate(path);
  };

  // Slideshow Logic
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {/* Slideshow */}
      <div className="image-slideshow">
        <button className="prev-button" onClick={prevSlide}>❮</button>
        <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
        <button className="next-button" onClick={nextSlide}>❯</button>
      </div>

      {/* Logo Section with Clickable Rambler */}
      <div className="logo-collection">
        <a href="https://ramblerleather.co/?srsltid=AfmBOoqmrRRY4AgzROkG7giehGR7mRA8xsd74bjbZd0QBrKJr9m4cLe4" target="_blank" rel="noopener noreferrer">
          <img src={Rambler} alt="Rambler Logo" />
        </a>

          <div className="wadud-c">
        <a href="https://www.al-wadud.xyz/" target="_blank" rel="nooper noreferrer" className="wadud">
           Al Wadud
        </a>
        </div>

        {/* {[ibm, google, airbus, fujistu, nasa].map((logo, index) => (
          <img key={index} src={logo} alt={`Logo-${index}`} />
        ))} */}
      </div>

      {/* Navigation Buttons */}
      <div className="button-container">
        <button className="Button" onClick={() => handleNavigation("/")}>Invest</button>
        <button className="Button1" onClick={() => handleNavigation("/contactPage")}>Create Investor Profile</button>
        <button className="Button2" onClick={() => handleNavigation("/ContactBusinessman")}>Contact Businessman</button>
        <button className="Button3" onClick={() => handleNavigation("/ContactInvestor")}>Contact Investor</button>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="foot">
    <div className="footer-container">
      {["Categories", "About us", "Privacy Policy", "Terms & Conditions"].map((item, index) => (
        <span key={index} className="foo"><a href="/#">{item}</a></span>
      ))}
    </div>
  </footer>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isBusinessmanPaid, setIsBusinessmanPaid] = useState(false);
  const [isInvestorPaid, setIsInvestorPaid] = useState(false);

  // Load session on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");
    const businessmanPaymentStatus = localStorage.getItem("businessmanPaymentStatus") === "completed";
    const investorPaymentStatus = localStorage.getItem("investorPaymentStatus") === "completed";

    setIsLoggedIn(!!token);
    setIsBusinessmanPaid(businessmanPaymentStatus);
    setIsInvestorPaid(investorPaymentStatus);

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData?.role) setUserType(parsedData.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} userType={userType} isBusinessmanPaid={isBusinessmanPaid} isInvestorPaid={isInvestorPaid} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/postbusiness" element={isLoggedIn ? <PostBusiness /> : <Navigate to="/login" />} />
        <Route path="/review" element={isLoggedIn ? <ReviewPage /> : <Navigate to="/login" />} />
        <Route path="/contactPage" element={isLoggedIn ? <ContactPage /> : <Navigate to="/login" />} />
        <Route path="/BusinessMan" element={isLoggedIn ? <BusinessMan /> : <Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/view-businesses" element={<ViewBusinesses />} />
        <Route path="/view-businesses/:id" element={<ViewBusinesses1 />} />
        <Route path="/bids" element={<Bids />} />

        {/* Payment & Contact Routes */}
        <Route path="/ContactBusinessman" element={<ContactBusinessman />} />
        <Route path="/ContactInvestor" element={<ContactInvestor />} />
        <Route path="/paymentBusinessman" element={<PaymentBusinessman />} />
        <Route path="/paymentInvestor" element={<PaymentInvestor />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
