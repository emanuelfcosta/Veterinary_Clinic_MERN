const express = require("express");
const router = express.Router();

const Procedure = require("../models/Procedure");

router.get(`/`, async (req, res) => {
  const procedureList = await Procedure.find();

  if (!procedureList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(procedureList);
});

router.get("/:id", async (req, res) => {
  const procedure = await Procedure.findById(req.params.id);

  if (!procedure) {
    res
      .status(500)
      .json({ message: "The procedure with the given ID was not found." });
  }
  res.status(200).send(procedure);
});

router.post("/", async (req, res) => {
  let procedure = new Procedure({
    name: req.body.name,
    price: req.body.price,
  });
  procedure = await procedure.save();

  if (!procedure)
    return res.status(400).send("the procedure cannot be created!");

  res.send(procedure);
});

router.put("/:id", async (req, res) => {
  const procedure = await Procedure.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
    },
    { new: true }
  );

  if (!procedure)
    return res.status(400).send("the procedure cannot be updated!");

  res.send(procedure);
});

router.delete("/:id", (req, res) => {
  Procedure.findByIdAndDelete(req.params.id)
    .then((procedure) => {
      if (procedure) {
        return res
          .status(200)
          .json({ success: true, message: "the procedure is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "procedure not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
