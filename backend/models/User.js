const mongoose = require("mongoose");

const sportsPositions = {
  football: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  cricket: [
    "Batsman",
    "Bowler",
    "All-Rounder",
    "Wicket-Keeper",
    "Opening Batsman",
    "Fast Bowler",
    "Spin Bowler",
  ],
};

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["player", "scout"], required: true },
  sport: {
    type: String,
    enum: Object.keys(sportsPositions),
    required: function () {
      return this.role === "player";
    },
  },
  position: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.role === "player" && this.sport) {
          return sportsPositions[this.sport]?.includes(value);
        }
        return true;
      },
      message: (props) => `${props.value} is not a valid position for the selected sport.`,
    },
  },
  height: { type: Number, required: function () { return this.role === "player"; } },
  weight: { type: Number, required: function () { return this.role === "player"; } },
  age: { type: Number, required: function () { return this.role === "player"; } },
});

module.exports = mongoose.model("User", UserSchema);
