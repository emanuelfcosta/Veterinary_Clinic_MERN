const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Client = require("../models/Client");
const Pet = require("../models/Pet");

router.get(`/`, async (req, res) => {
  const petList = await Pet.find().populate("client");

  if (!petList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(petList);
});

router.get("/:id", async (req, res) => {
  const pet = await Pet.findById(req.params.id).populate("client");

  if (!pet) {
    res
      .status(500)
      .json({ message: "The Pet with the given ID was not found." });
  }
  res.status(200).send(pet);
});

router.post("/", async (req, res) => {
  const client = await Client.findById(req.body.client);
  if (!client) return res.status(400).send("Invalid Department");

  let pet = new Pet({
    name: req.body.name,
    specie: req.body.specie,
    breed: req.body.breed,
    color: req.body.color,
    height: req.body.height,
    weight: req.body.weight,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    father: req.body.father,
    mother: req.body.mother,
    observations: req.body.observations,
    client: client,
  });
  pet = await pet.save();

  if (!pet) return res.status(400).send("the pet cannot be created!");

  res.send(pet);
});

router.put("/:id", async (req, res) => {
  const client = await Client.findById(req.body.client);
  if (!client) return res.status(400).send("Invalid Client");

  const pet = await Pet.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      specie: req.body.specie,
      breed: req.body.breed,
      color: req.body.color,
      height: req.body.height,
      weight: req.body.weight,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      father: req.body.father,
      mother: req.body.mother,
      observations: req.body.observations,

      client: client,
    },
    { new: true }
  );

  if (!pet) return res.status(400).send("the pet cannot be updated!");

  res.send(pet);
});

router.delete("/:id", (req, res) => {
  Pet.findByIdAndDelete(req.params.id)
    .then((pet) => {
      if (pet) {
        return res
          .status(200)
          .json({ success: true, message: "the pet is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "pet not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
