const mongoose = require("mongoose");

const riceInfoSchema = new mongoose.Schema(
  {
    imageURL: String,
    name: String,
    inspectionId: String,
    standard: String,
    totalSample: Number,
    note: String,
    price: Number,
    dateTimeOfSampling: Date,
    samplingPoint: [String],
    composition: [
      {
        name: String,
        lengthRange: String,
        actualPercentage: String,
      },
    ],
    defectRice: [
      {
        name: String,
        actualPercentage: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("RiceInfo", riceInfoSchema);
