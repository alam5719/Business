  


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessMan.css";

const BusinessMan = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({
    business_type: "",
    location: "",
    company_name: "",
    year_founded: "",
    website: "",
    sector: "",
    preferred_sector: "",
    stage_of_business: "", // Added Stage of Business here
    target_market: "",
    total_funding_required: "",
    equity_offered: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("businessData");
    if (savedData) {
      setBusinessData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "total_funding_required" || name === "equity_offered") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    const updatedData = { ...businessData, [name]: value };
    setBusinessData(updatedData);
    localStorage.setItem("businessData", JSON.stringify(updatedData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/review");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="BMan-container">
      <form onSubmit={handleSubmit} className="t1-container">
        <h2 className="business-info">Business Details</h2>

        {Object.keys(businessData).map((key) => {
          if (key === "stage_of_business") {
            return (
              <React.Fragment key={key}>
                <label className="form-label">Sector:</label>
                <textarea
                  className="form-textarea"
                  name="sector"
                  value={businessData.sector}
                  onChange={handleChange}
                  required
                />

                <label className="form-label">Preferred Sector:</label>
                <textarea
                  className="form-textarea"
                  name="preferred_sector"
                  value={businessData.preferred_sector}
                  onChange={handleChange}
                  required
                />

                <label className="form-label">Stage of Business:</label>
                <textarea
                  className="form-textarea"
                  name="stage_of_business"
                  value={businessData.stage_of_business}
                  onChange={handleChange}
                  required
                />
              </React.Fragment>
            );
          }

          return key !== "sector" && key !== "preferred_sector" ? (
            key !== "year_founded" &&
            key !== "total_funding_required" &&
            key !== "equity_offered" ? (
              <React.Fragment key={key}>
                <label className="form-label">
                  {key.replace(/_/g, " ").replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  )}
                  :
                </label>
                <textarea
                  className="form-textarea"
                  name={key}
                  value={businessData[key]}
                  onChange={handleChange}
                  required
                />
              </React.Fragment>
            ) : (
              <React.Fragment key={key}>
                <label className="form-label">
                  {key.replace(/_/g, " ").replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  )}
                  :
                </label>
                <input
                  className="form-input"
                  type="number"
                  name={key}
                  value={businessData[key]}
                  onChange={handleChange}
                  required
                />
              </React.Fragment>
            )
          ) : null;
        })}

        <button type="button" className="back-btn" onClick={handleBack}>
          Back
        </button>
        <button className="next-btn" type="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default BusinessMan;
