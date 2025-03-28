require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");
const Skill = require("./models/Skill");
const Businessman = require("./models/Businessman");
const Investment = require("./models/Investment");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/BConsult";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


  const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


app.post("/signup", upload.single("profilePicture"), async (req, res) => {
  try {
    const { email, username, phone, password, confirmPassword, role } = req.body;

    if (!email || !username || !phone || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicturePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default-profile.jpg";

    const newUser = new User({
      email,
      username,
      phone,
      password: hashedPassword,
      role,
      profile_picture: profilePicturePath,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role,
        profile_picture: user.profile_picture || "/uploads/default-profile.jpg",
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

 
app.get("/api/skills", async (req, res) => {
  try {
    const skills = await Skill.find().select("name -_id");
    res.json(skills.map(skill => skill.name));
  } catch (error) {
    console.error("❌ Skills Fetch Error:", error);
    res.status(500).json({ message: "Error fetching skills" });
  }
});


app.get("/api/skills/auto-insert", async (req, res) => {
  try {
    const existingSkills = await Skill.find();
    if (existingSkills.length > 0) {
      return res.status(400).json({ message: "Skills already exist" });
    }

    const skills = [
      "Technology", "Healthcare", "Finance", "Education", "Real Estate",
      "E-commerce", "Renewable Energy", "Manufacturing", "Agriculture",
      "Biotech", "AI & Machine Learning", "Cybersecurity", "Automotive"
    ];

    await Skill.insertMany(skills.map(name => ({ name })));
    res.status(201).json({ message: "Skills added successfully!" });
  } catch (error) {
    console.error("❌ Auto Insert Skills Error:", error);
    res.status(500).json({ message: "Error adding skills" });
  }
});


app.post("/api/investment/saveInvestment", async (req, res) => {
  try {
    const { investorName, investorEmail, amount, skills, message } = req.body;

    if (!investorName || !investorEmail || !amount || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newInvestment = new Investment({
      investorName,
      investorEmail,
      amount,
      skills,
      message,
    });

    await newInvestment.save();
    res.status(201).json({ message: "Investment saved successfully!" });
  } catch (error) {
    console.error("❌ Investment Save Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/businessmen", async (req, res) => {
  try {
    const newBusinessman = new Businessman(req.body);
    await newBusinessman.save();
    res.status(201).json({ message: "Businessman data saved successfully!" });
  } catch (error) {
    console.error("❌ Businessman Save Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/businesses", async (req, res) => {
  try {
    const businesses = await Businessman.find();
    res.status(200).json(businesses);
  } catch (error) {
    console.error("❌ Fetch Businesses Error:", error);
    res.status(500).json({ message: "Error fetching businesses" });
  }
});


app.get("/api/businessman/:id", async (req, res) => {
  try {
    const business = await Businessman.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });
    res.status(200).json(business);
  } catch (error) {
    console.error("❌ Fetch Business Error:", error);
    res.status(500).json({ message: "Error fetching business" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





















// require("dotenv").config();
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");
// const User = require("./models/User");
// const Skill = require("./models/Skill");
// const Businessman = require("./models/Businessman");
// const Investment = require("./models/Investment");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";


// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/BConsult";
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));


//   const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });


// app.post("/signup", upload.single("profilePicture"), async (req, res) => {
//   try {
//     const { email, username, phone, password, confirmPassword, role } = req.body;

//     if (!email || !username || !phone || !password || !confirmPassword || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profilePicturePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default-profile.jpg";

//     const newUser = new User({
//       email,
//       username,
//       phone,
//       password: hashedPassword,
//       role,
//       profile_picture: profilePicturePath,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("❌ Signup Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         username: user.username,
//         phone: user.phone,
//         role: user.role,
//         profile_picture: user.profile_picture || "/uploads/default-profile.jpg",
//       },
//     });
//   } catch (error) {
//     console.error("❌ Login Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

 
// app.get("/api/skills", async (req, res) => {
//   try {
//     const skills = await Skill.find().select("name -_id");
//     res.json(skills.map(skill => skill.name));
//   } catch (error) {
//     console.error("❌ Skills Fetch Error:", error);
//     res.status(500).json({ message: "Error fetching skills" });
//   }
// });


// app.get("/api/skills/auto-insert", async (req, res) => {
//   try {
//     const existingSkills = await Skill.find();
//     if (existingSkills.length > 0) {
//       return res.status(400).json({ message: "Skills already exist" });
//     }

//     const skills = [
//       "Technology", "Healthcare", "Finance", "Education", "Real Estate",
//       "E-commerce", "Renewable Energy", "Manufacturing", "Agriculture",
//       "Biotech", "AI & Machine Learning", "Cybersecurity", "Automotive"
//     ];

//     await Skill.insertMany(skills.map(name => ({ name })));
//     res.status(201).json({ message: "Skills added successfully!" });
//   } catch (error) {
//     console.error("❌ Auto Insert Skills Error:", error);
//     res.status(500).json({ message: "Error adding skills" });
//   }
// });


// app.post("/api/investment/saveInvestment", async (req, res) => {
//   try {

//     console.log("Recieved Investment Request:",req.body);
//     const { investorName, investorEmail, amount, skills, message } = req.body;

//     if (!investorName || !investorEmail || !amount || !skills || !Array.isArray(skills)) {
//       return res.status(400).json({ 
//         message: "All fields are required" 
//         receivedData: req.body,
//       });
//     }

//     const newInvestment = new Investment({
//       investorName,
//       investorEmail,
//       amount,
//       skills,
//       message: message|| "",
//     });

//     await newInvestment.save();
//     res.status(201).json({ message: "Investment saved successfully!" });
//   } catch (error) {
//     console.error("❌ Investment Save Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.post("/api/businessmen", async (req, res) => {
//   try {
//     const newBusinessman = new Businessman(req.body);
//     await newBusinessman.save();
//     res.status(201).json({ message: "Businessman data saved successfully!" });
//   } catch (error) {
//     console.error("❌ Businessman Save Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.get("/api/businesses", async (req, res) => {
//   try {
//     const businesses = await Businessman.find();
//     res.status(200).json(businesses);
//   } catch (error) {
//     console.error("❌ Fetch Businesses Error:", error);
//     res.status(500).json({ message: "Error fetching businesses" });
//   }
// });


// app.get("/api/businessman/:id", async (req, res) => {
//   try {
//     const business = await Businessman.findById(req.params.id);
//     if (!business) return res.status(404).json({ message: "Business not found" });
//     res.status(200).json(business);
//   } catch (error) {
//     console.error("❌ Fetch Business Error:", error);
//     res.status(500).json({ message: "Error fetching business" });
//   }
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));














