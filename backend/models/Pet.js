const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specie: { type: String, required: true },
  breed: { type: String, required: true },
  color: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  gender: { type: String, required: true },
  birthDate: { type: Date, required: true },
  father: { type: String, required: true },
  mother: { type: String, required: true },
  observations: { type: String, required: true },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
});

module.exports = mongoose.model("Pet", petSchema);
