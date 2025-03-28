 



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setLoading(true);

//     try {
//       console.log("🔍 Sending Login Request:", { email, password });

//       const response = await axios.post("http://localhost:5000/login", { email, password });

//       console.log("✅ Login Successful:", response.data);

//       // Store token & user data in localStorage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("profilePicture", response.data.user.profile_picture || "/uploads/default-profile.jpg"); // ✅ Store profile picture

//       setIsLoggedIn(true);
//       navigate("/");
//     } catch (error) {
//       console.error("❌ Login Error:", error.response?.data?.message || error.message);
//       setErrorMessage(error.response?.data?.message || "Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="head-login">Log In</h2>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}

//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Logging in..." : "Log In"}
//           </button>
//         </form>

//         <div className="footer-links">
//           <p>Don't have an account? <a href="/signup" className="signup-link">Sign Up</a></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;








 






import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      console.log("🔍 Sending Login Request:", { email, password });

      const response = await axios.post("http://localhost:5000/login", { email, password });

      console.log("✅ Login Successful:", response.data);

      // Store token & user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("profilePicture", response.data.user.profile_picture || "/uploads/default-profile.jpg"); // ✅ Store profile picture

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="head-login">Log In</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="footer-links">
          <p>Don't have an account? <a href="/signup" className="signup-link">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
