const express = require("express");
const router = express.Router();

const Client = require("../models/Client");

router.get(`/`, async (req, res) => {
  const clientList = await Client.find();

  if (!clientList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(clientList);
});

router.get("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res
      .status(500)
      .json({ message: "The client with the given ID was not found." });
  }
  res.status(200).send(client);
});

router.post("/", async (req, res) => {
  let client = new Client({
    name: req.body.name,
    email: req.body.email,
    cellPhone: req.body.cellPhone,
    address: req.body.address,
    state: req.body.state,
  });
  client = await client.save();

  if (!client) return res.status(400).send("the client cannot be created!");

  res.send(client);
});

router.put("/:id", async (req, res) => {
  const client = await Client.findByIdAndUpdate(
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

  if (!client) return res.status(400).send("the client cannot be updated!");

  res.send(client);
});

router.delete("/:id", (req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then((client) => {
      if (client) {
        return res
          .status(200)
          .json({ success: true, message: "the client is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "client not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
