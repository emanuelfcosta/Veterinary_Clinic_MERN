const express = require("express");
const router = express.Router();

const Vet = require("../models/Vet");

router.get(`/`, async (req, res) => {
  const vetList = await Vet.find();

  if (!vetList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(vetList);
});

router.get("/:id", async (req, res) => {
  const vet = await Vet.findById(req.params.id);

  if (!vet) {
    res
      .status(500)
      .json({ message: "The vet with the given ID was not found." });
  }
  res.status(200).send(vet);
});

router.post("/", async (req, res) => {
  let vet = new Vet({
    name: req.body.name,
    email: req.body.email,
    cellPhone: req.body.cellPhone,
    address: req.body.address,
    state: req.body.state,
  });
  vet = await vet.save();

  if (!vet) return res.status(400).send("the vet cannot be created!");

  res.send(vet);
});

router.put("/:id", async (req, res) => {
  const vet = await Vet.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      cellPhone: req.body.cellPhone,
      address: req.body.address,
      state: req.body.state,
    },
    { new: true }
  );

  if (!vet) return res.status(400).send("the vet cannot be updated!");

  res.send(vet);
});

router.delete("/:id", (req, res) => {
  Vet.findByIdAndDelete(req.params.id)
    .then((vet) => {
      if (vet) {
        return res
          .status(200)
          .json({ success: true, message: "the vet is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "vet not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
