const mongoose = require("mongoose");

const procedureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
});

module.exports = mongoose.model("Procedure", procedureSchema);
