 



// const mongoose = require("mongoose");

// const InvestmentSchema = new mongoose.Schema({
//   location: { type: String, required: true },
//   investment_range_min: { type: Number, required: true },
//   investment_range_max: { type: Number, required: true },
//   preferred_stage: { type: String, required: true },
//   preferred_region: { type: String, required: true },
//   preferred_sectors: { type: [String], required: true },
//   investorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Linking investment to investor
// });

// module.exports = mongoose.model("Investment", InvestmentSchema);












const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  investment_range_min: {
    type: Number,
    required: true,
  },
  investment_range_max: {
    type: Number,
    required: true,
  },
  preferred_stage: {
    type: String,
    required: true,
  },
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
