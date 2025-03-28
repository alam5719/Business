 



// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewBusinesses1.css";

// function ViewBusinesses1() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [business, setBusiness] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/businessman/${id}`)
//       .then((res) => setBusiness(res.data))
//       .catch((err) =>
//         console.error("❌ Error fetching business details:", err)
//       );
//   }, [id]);

//   if (!business)
//     return (
//       <div className="BMan-container">
//         <div className="t1-container">
//           <h2 className="business-info">Loading...</h2>
//         </div>
//       </div>
//     );

//   return (
//     <div className="BMan-container">
//       <div className="t1-container">
//         <h2 className="business-info">Business Details</h2>

//         <h3 className="business-name">{business.businessName}</h3>

//         <div className="business-detail">

//           <div className="detail-row">
//             <span className="label">Description:</span>
//             <span className="value">{business.businessDescription}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Business Type:</span>
//             <span className="value">{business.business_type}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Location:</span>
//             <span className="value">{business.location}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Company Name:</span>
//             <span className="value">{business.company_name}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Year Founded:</span>
//             <span className="value">{business.year_founded}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Website:</span>
//             <span className="value">
//               <a
//                 href={business.website}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="website-link"
//               >
//                 {business.website}
//               </a>
//             </span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Sector:</span>
//             <span className="value">
//               {Array.isArray(business.sector)
//                 ? business.sector.join(", ")
//                 : business.sector}
//             </span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Preferred Sector:</span>
//             <span className="value">
//               {Array.isArray(business.preferred_sector)
//                 ? business.preferred_sector.join(", ")
//                 : business.preferred_sector}
//             </span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Stage of Business:</span>
//             <span className="value">{business.stage_of_business}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Target Market:</span>
//             <span className="value">{business.target_market}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Total Funding Required:</span>
//             <span className="value">{business.total_funding_required}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Equity Offered:</span>
//             <span className="value">{business.equity_offered}</span>
//           </div>

//           <div className="detail-row">
//             <span className="label">Attachment:</span>
//             <span className="value">
//               {business.businessFile ? (
//                 <a
//                   href={`http://localhost:5000/uploads/${business.businessFile}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="file-link"
//                 >
//                   {business.businessFile}
//                 </a>
//               ) : (
//                 "No attachment uploaded"
//               )}
//             </span>
//           </div>

//         </div>

//         {/* <div className="btn-group"> */}
//           <button className="back-btn" onClick={() => navigate(-1)}>
//             Back
//           </button>
//           <button className="intrest-btn">Show Interest</button>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }

// export default ViewBusinesses1;











 

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewBusinesses1.css";

function ViewBusinesses1() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/businessman/${id}`)
      .then((res) => setBusiness(res.data))
      .catch((err) =>
        console.error("❌ Error fetching business details:", err)
      );
  }, [id]);

  const handleShowInterest = () => {
    if (business) {
      // Save businessman details to localStorage
      localStorage.setItem(
        "selectedBusinessman",
        JSON.stringify({
          name: business.company_name,
          email: business.email || "Not available",
          phone: business.phone || "Not available",
          photo: business.profilePicture || "default.png",
        })
      );
      // Navigate to investor payment page
      navigate("/investor-payment");
    }
  };

  if (!business)
    return (
      <div className="BMan-container">
        <div className="t1-container">
          <h2 className="business-info">Loading...</h2>
        </div>
      </div>
    );

  return (
    <div className="BMan-container">
      <div className="t1-container">
        <h2 className="business-info">Business Details</h2>

        <h3 className="business-name">{business.businessName}</h3>

        <div className="business-detail">
          {[
            ["Description", business.businessDescription],
            ["Business Type", business.business_type],
            ["Location", business.location],
            ["Company Name", business.company_name],
            ["Year Founded", business.year_founded],
            ["Website", (
              <a
                href={business.website}
                target="_blank"
                rel="noreferrer"
                className="website-link"
              >
                {business.website}
              </a>
            )],
            ["Sector", Array.isArray(business.sector) ? business.sector.join(", ") : business.sector],
            ["Preferred Sector", Array.isArray(business.preferred_sector) ? business.preferred_sector.join(", ") : business.preferred_sector],
            ["Stage of Business", business.stage_of_business],
            ["Target Market", business.target_market],
            ["Total Funding Required", business.total_funding_required],
            ["Equity Offered", business.equity_offered],
            ["Attachment", (
              business.businessFile ? (
                <a
                  href={`http://localhost:5000/uploads/${business.businessFile}`}
                  target="_blank"
                  rel="noreferrer"
                  className="file-link"
                >
                  {business.businessFile}
                </a>
              ) : (
                "No attachment uploaded"
              )
            )],
          ].map(([label, value]) => (
            <div className="detail-row" key={label}>
              <span className="label">{label}:</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="intrest-btn" onClick={handleShowInterest}>
          Show Interest
        </button>
      </div>
    </div>
  );
}

export default ViewBusinesses1;
