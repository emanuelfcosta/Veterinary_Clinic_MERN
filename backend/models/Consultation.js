const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  theDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },

  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },

  vet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vet",
    required: true,
  },

  procedures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Procedure",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Consultation", consultationSchema);
