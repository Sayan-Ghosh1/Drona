const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["player", "scout"], required: true },
  sport: String,  // Only for players
  position: String, // Only for players
  height: Number,  // Only for players
  weight: Number,  // Only for players
  age: Number,  // Only for players
});

module.exports = mongoose.model("User", UserSchema);
