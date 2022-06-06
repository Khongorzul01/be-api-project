const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = mongoose.connection;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter the password!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Enter the email!"],
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  password: {
    type: String,
    required: [true, "Enter the password!"],
  },
  address: {
    type: String,
  },
  role_id: {
    type: Number,
  },
  created_date: {
    type: Date,
  },
  last_activity: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
