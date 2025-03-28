 




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReviewPage.css";

const ReviewPage = () => {
  const [postBusinessData, setPostBusinessData] = useState({
    businessName: "",
    businessDescription: "",
    businessFile: "",
  });
  const [businessData, setBusinessData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const postBusiness = {
      businessName: localStorage.getItem("businessName") || "",
      businessDescription: localStorage.getItem("businessDescription") || "",
      businessFile: localStorage.getItem("businessFile") || "",
    };

    const business = JSON.parse(localStorage.getItem("businessData")) || {};

    setPostBusinessData(postBusiness);
    setBusinessData(business);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      const fullData = {
        ...postBusinessData,
        ...businessData,
        businessFile: postBusinessData.businessFile || null,
        business_plan_path: businessData.business_plan_path || null,
      };

      const response = await axios.post(
        "http://localhost:5000/api/businessmen",
        fullData
      );

      if (response.status === 201) {
        alert("Business details submitted successfully!");
        localStorage.removeItem("businessName");
        localStorage.removeItem("businessDescription");
        localStorage.removeItem("businessFile");
        localStorage.removeItem("businessData");
        navigate("/");
      } else {
        alert("Failed to submit business details.");
      }
    } catch (error) {
      console.error("Error submitting business data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="f-container">
      <h2>Review Your Business Details</h2>

      <label className="form-label">Business Name:</label>
      <textarea className="form-textarea" value={postBusinessData.businessName} readOnly />

      <label className="form-label">Business Description:</label>
      <textarea className="form-textarea" value={postBusinessData.businessDescription} readOnly />

      <label className="form-label">Uploaded Business Plan:</label>
      <input className="form-input" type="text" value={postBusinessData.businessFile || "null"} readOnly />

      <label className="form-label">Business Type:</label>
      <textarea className="form-textarea" value={businessData.business_type || ""} readOnly />

      <label className="form-label">Location:</label>
      <textarea className="form-textarea" value={businessData.location || ""} readOnly />

      <label className="form-label">Company Name:</label>
      <textarea className="form-textarea" value={businessData.company_name || ""} readOnly />

      <label className="form-label">Year Founded:</label>
      <input className="form-input" type="number" value={businessData.year_founded || ""} readOnly />

      <label className="form-label">Website:</label>
      <textarea className="form-textarea" value={businessData.website || ""} readOnly />

      <label className="form-label">Sector:</label>
      <textarea className="form-textarea" value={businessData.sector || ""} readOnly />

      <label className="form-label">Preferred Sector:</label>
      <textarea className="form-textarea" value={businessData.preferred_sector || ""} readOnly />

      <label className="form-label">Stage of Business:</label>
      <textarea className="form-textarea" value={businessData.stage_of_business || ""} readOnly />

      <label className="form-label">Target Market:</label>
      <textarea className="form-textarea" value={businessData.target_market || ""} readOnly />

      <label className="form-label">Total Funding Required:</label>
      <input className="form-input" type="number" value={businessData.total_funding_required || ""} readOnly />

      <label className="form-label">Equity Offered:</label>
      <input className="form-input" type="number" value={businessData.equity_offered || ""} readOnly />

      <label className="form-label">Business Plan Path:</label>
      <textarea className="form-textarea" value={businessData.business_plan_path || "null"} readOnly />

      <div className="button-group">
        <button className="back-btn" onClick={handleBack}>Back</button>
        <button className="submit-btn2" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewPage;
