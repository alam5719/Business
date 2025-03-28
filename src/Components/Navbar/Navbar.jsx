import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";
import tlogic from "../../assets/tlogic.webp";
import defaultProfile from "../../assets/default-img.jpg";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(defaultProfile);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    console.log("Checking login status:", isLoggedIn);

    if (isLoggedIn) {
      const storedProfile = localStorage.getItem("profilePicture");
      console.log("Fetched profile picture from localStorage:", storedProfile);

      if (storedProfile && storedProfile !== "null" && storedProfile !== "undefined") {
        setProfilePicture(storedProfile.startsWith("http") ? storedProfile : `http://localhost:5000${storedProfile}`);
      } else {
        setProfilePicture(defaultProfile);
      }

      const storedUser = localStorage.getItem("user");
      console.log("Stored user data:", storedUser);

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          console.log("Parsed user role:", user?.role);
          setUserRole(user?.role || "");
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    }
  }, [isLoggedIn]);

  const handleImageError = () => {
    console.log("Error loading profile image. Using default image.");
    setProfilePicture(defaultProfile);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.clear();
    setProfilePicture(defaultProfile);
    setUserRole(""); 
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handlePostBusinessClick = () => {
    if (isLoggedIn) {
      navigate("/postbusiness");
    } else {
      navigate("/login", { state: { redirectTo: "/postbusiness" } });
    }
  };

  const handleViewBusinessesClick = () => {
    if (isLoggedIn) {
      navigate("/view-businesses");
    } else {
      navigate("/login", { state: { redirectTo: "/view-businesses" } });
    }
  };


  const handleBidsClick = () => {
    if (isLoggedIn){
      navigate("/bids");
    } else {
      navigate("/login",{state: {redirectTo: "/bids"}});
      
    }
  }


  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-container">
          <img src={tlogic} alt="TLogic Logo" className="navbar-logo" />
        </Link>

      
        {isLoggedIn && (
          <>
            {userRole === "investor" && (
              <button className="nav-item-post-business-btn" onClick={handleViewBusinessesClick}>
                View Businesses
              </button>
            )}

            {userRole === "businessman" && (
              <button className="nav-item-post-business-btn" onClick={handlePostBusinessClick}>
                Post a Business
              </button>
            )}

            <button className="bids-btn" onClick={handleBidsClick}>Bids</button>
          </>
          
    
        )}

{/* <button className="bids-btn">Bids </button> */}

      </div>

      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-item">Log In</Link>
            <Link to="/signup" className="nav-item">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}

        {isLoggedIn && (
          <div className="profile-container">
            <img
              src={profilePicture}
              alt="Profile"
              className="navbar-profile-pic"
              onError={handleImageError}
            />
          </div>
        )}
 
      </div>
    </div>
  );
};

export default Navbar;




