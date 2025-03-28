const mongoose = require("mongoose");

const businessmanSchema = new mongoose.Schema({
  businessName: String,
  businessDescription: String,
  businessFile: String,
  business_type: String,
  location: String,
  company_name: String,
  year_founded: String,
  website: String,
  sector: [String],
  preferred_sector: [String],
  stage_of_business: String,
  target_market: String,
  total_funding_required: String,
  equity_offered: String,
});

module.exports = mongoose.models.Businessman || mongoose.model("Businessman", businessmanSchema);
