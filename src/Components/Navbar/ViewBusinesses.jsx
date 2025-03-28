 






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewBusinesses.css";

const ViewBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/businesses");
        setBusinesses(res.data);
      } catch (error) {
        console.error("❌ Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/view-businesses/${id}`);
  };

  return (
    <div className="BMan-container">
      <div className="t1-container">
       

        <h2 className="business-info">All Businesses</h2>

        {businesses.length === 0 ? (
          <p className="no-data">No businesses found.</p>
        ) : (
          businesses.map((business, index) => (
            <div key={business._id} className="business-card">
              <h3 className="business-name">
                {index + 1}. {business.businessName}
              </h3>
              <label className="form-label">Description:</label>
              <p className="business-desc">{business.businessDescription}</p>

              <button
                className="next-btn2"
                onClick={() => handleViewDetails(business._id)}
              >
                View Details
              </button>
            </div>
          ))
        )}

          
         {/* <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button> */}

      </div>
    </div>
  );
};

export default ViewBusinesses;
