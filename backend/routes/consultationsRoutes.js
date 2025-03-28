const express = require("express");
const router = express.Router();

const Consultation = require("../models/Consultation");
const Pet = require("../models/Pet");
const Vet = require("../models/Vet");
const Procedure = require("../models/Procedure");

router.get(`/`, async (req, res) => {
  const consultationList = await Consultation.find()
    .populate("procedures") // Popula os dados dos procedimentos associados
    .populate("pet") // Também popula os dados do pet
    .populate("pet.client") // Popula os dados do cliente associado ao pet
    .populate("vet"); // E os dados do veterinário

  if (!consultationList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(consultationList);
});

router.get("/:id", async (req, res) => {
  const consultation = await Consultation.findById(req.params.id)
    .populate("procedures") // Popula os dados dos procedimentos associados
    .populate("pet") // Popula os dados do pet
    .populate("pet.client") // Popula os dados do cliente associado ao pet
    .populate("vet"); // E os dados do veterinário

  if (!consultation) {
    res
      .status(500)
      .json({ message: "The consultation with the given ID was not found." });
  }
  res.status(200).send(consultation);
});

router.post("/", async (req, res) => {
  const pet = await Pet.findById(req.body.pet);
  const vet = await Vet.findById(req.body.vet);

  if (!pet) return res.status(400).send("Invalid Pet");
  if (!vet) return res.status(400).send("Invalid Vet");

  // Verifica se os procedimentos fornecidos são válidos
  const procedures = await Procedure.find({
    _id: { $in: req.body.procedures },
  });
  if (procedures.length !== req.body.procedures.length) {
    return res.status(400).send("Some procedures are invalid.");
  }

  let consultation = new Consultation({
    theDate: req.body.theDate,
    totalCost: req.body.totalCost,
    pet: pet,
    vet: vet,
    procedures: req.body.procedures, // Adiciona os procedimentos à consulta
  });
  consultation = await consultation.save();

  if (!consultation)
    return res.status(400).send("the consultation cannot be created!");

  res.send(consultation);
});

router.delete("/:id", (req, res) => {
  Consultation.findByIdAndDelete(req.params.id)
    .then((consultation) => {
      if (consultation) {
        return res
          .status(200)
          .json({ success: true, message: "the consultation is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "consultation not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
