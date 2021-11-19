const mongoose = require("mongoose");

const VisitorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visitor", VisitorSchema);
