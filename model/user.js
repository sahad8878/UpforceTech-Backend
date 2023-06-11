const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  fName: {
    type: String,
    default: "",
  },
  lName: {
    type: String,
    default: "",
  },
  profile: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
  gender: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("User", User);
