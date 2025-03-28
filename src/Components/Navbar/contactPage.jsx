import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import "./contactPage.css";

const Contact = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [formData, setFormData] = useState({
    location: "",
    investment_range_min: "",
    investment_range_max: "",
    preferred_stage: "",
    preferred_region: "",
    preferred_sectors: [],
  });
  const [errors, setErrors] = useState({});
  
  const [userId, setUserId] = useState(null);

  // ✅ Fetch skills from backend on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/skills");
        const data = await response.json();
        console.log("Fetched skills:", data);
        setSkills(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    // ✅ Get user ID from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.id) {
      setUserId(userData.id);
    } else {
      console.warn("⚠️ No userData found in localStorage");
    }

    fetchSkills();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    setFilteredSkills(
      query
        ? skills.filter((skill) =>
            skill.toLowerCase().includes(query.toLowerCase())
          )
        : []
    );
  };

  const handleSectorSelection = (sector) => {
    setFormData((prev) => ({
      ...prev,
      preferred_sectors: prev.preferred_sectors.includes(sector)
        ? prev.preferred_sectors.filter((s) => s !== sector)
        : [...prev.preferred_sectors, sector],
    }));
    setErrors((prev) => ({ ...prev, sectors: "" }));
    setSearch("");
    setFilteredSkills([]); // ✅ Reset after selection
  };

  const handleRemoveSector = (sector) => {
    setFormData((prev) => ({
      ...prev,
      preferred_sectors: prev.preferred_sectors.filter((s) => s !== sector),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "investment_range_min" || name === "investment_range_max") {
      const min =
        name === "investment_range_min" ? Number(value) : Number(formData.investment_range_min);
      const max =
        name === "investment_range_max" ? Number(value) : Number(formData.investment_range_max);

      if (min && max && max <= min) {
        setErrors((prev) => ({
          ...prev,
          investment: "Maximum amount must be greater than minimum amount.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, investment: "" }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validationErrors = {};
    if (
      Number(formData.investment_range_max) <=
      Number(formData.investment_range_min)
    ) {
      validationErrors.investment =
        "Maximum amount must be greater than minimum amount.";
    }
    if (formData.preferred_sectors.length === 0) {
      validationErrors.sectors = "Please select at least one sector.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      userId,
      location: formData.location,
      investment_range_min: Number(formData.investment_range_min),
      investment_range_max: Number(formData.investment_range_max),
      preferred_stage: formData.preferred_stage,
      preferred_region: formData.preferred_region,
      preferred_sectors: formData.preferred_sectors,
    };

    console.log("📤 Sending data:", payload);

    try {
      const response = await fetch(
        "http://localhost:5000/api/investment/saveInvestment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("✅ Investment data saved successfully!");
        setFormData({
          location: "",
          investment_range_min: "",
          investment_range_max: "",
          preferred_stage: "",
          preferred_region: "",
          preferred_sectors: [],
        });
        setErrors({});
      } else {
        alert("❌ Error saving investment data: " + data.error);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="t1-container">
      <h1 className="h">Investment Preferences</h1>
      <p className="p">Tell us about your investment interests.</p>

      <form onSubmit={handleSubmit} className="form-container">
        <label>Location:</label>
        <textarea
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter your location"
          required
        />

        <label>Investment Range (Min - Max):</label>
        <div className="investment-range">
          <input
            type="number"
            name="investment_range_min"
            value={formData.investment_range_min}
            onChange={handleChange}
            placeholder="Min Amount"
            required
          />
          <input
            type="number"
            name="investment_range_max"
            value={formData.investment_range_max}
            onChange={handleChange}
            placeholder="Max Amount"
            required
          />
        </div>
        {errors.investment && <p className="error-text">{errors.investment}</p>}

        <label>Preferred Stage:</label>
        <textarea
          name="preferred_stage"
          value={formData.preferred_stage}
          onChange={handleChange}
          placeholder="Early Stage, Growth Stage, etc."
          required
        />

        <label>Preferred Region:</label>
        <textarea
          name="preferred_region"
          value={formData.preferred_region}
          onChange={handleChange}
          placeholder="e.g. USA, Europe, Asia"
          required
        />

        <label>Preferred Sectors:</label>
        <div className="search-container">
          <div className="search-icon">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for sectors..."
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {search && (
          <ul className="dropdown1">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill, index) => (
                <li key={index} onClick={() => handleSectorSelection(skill)}>
                  {skill}
                </li>
              ))
            ) : (
              <li className="no-results">No sectors found</li>
            )}
          </ul>
        )}

        <div className="selected-sectors">
          {formData.preferred_sectors.map((sector, index) => (
            <span key={index} className="sector-tag">
              {sector}
              <span
                className="remove-sector"
                onClick={() => handleRemoveSector(sector)}
              >
                ✖
              </span>
            </span>
          ))}
        </div>
        {errors.sectors && <p className="error-text">{errors.sectors}</p>}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;



