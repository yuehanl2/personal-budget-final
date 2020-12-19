const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
     userId: {
      type: String,
      required: true,
     },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { collection: "budgetData" }
);

module.exports = mongoose.model("budgetData", budgetSchema);