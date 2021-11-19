const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = mongoose.Schema({
  title: {
    type: String,
    requred: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
