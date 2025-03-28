


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   profile_picture: { type: String, default: null },
//   created_at: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("User", userSchema);




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profile_picture: { type: String, default: "/uploads/default-profile.jpg" },
});

// ✅ Fix to prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
