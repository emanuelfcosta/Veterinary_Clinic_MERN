const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/vet-clinic-github-MERN");
  console.log("Mongoose Conected");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
