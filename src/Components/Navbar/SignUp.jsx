 



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "businessman",
    profilePicture: null,
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords don't match", type: "error" });
      setLoading(false);
      return;
    }

    if (!agreeTerms) {
      setMessage({ text: "You must agree to the terms", type: "error" });
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post("http://localhost:5000/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: "Signup Successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Signup failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="head-signup">Sign Up</h2>

        <div className="role-selection">
          <label>
            <input type="radio" name="role" value="businessman" checked={formData.role === "businessman"} onChange={handleChange} />
            Businessman
          </label>
          <label>
            <input type="radio" name="role" value="investor" checked={formData.role === "investor"} onChange={handleChange} />
            Investor
          </label>
        </div>

        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter your username" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input type="text" name="phone" placeholder="Enter your phone number" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Profile Picture</label>
            <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
          </div>

          <div className="terms-container">
            <input type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />
            <label htmlFor="agreeTerms">I agree to the <Link to="/terms">Terms & Conditions</Link></label>
          </div>

          <button type="submit" className="signup-btn" disabled={loading || !agreeTerms}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;