const { CompositionAndDefectRice } = require("../services/seperateRice");
const RiceInfo = require("../models/riceInfo");

exports.getAllHistory = async (req, res) => {
  try {
    const history = await RiceInfo.find({}).exec();
    res.send(history);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.getHistoryByID = async (req, res) => {
  try {
    const id = req.params.id;
    const historyById = await RiceInfo.find({ inspectionId: id }).exec();
    res.send(historyById);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.postHistory = async (req, res) => {
  try {
    const { name, standard, note, price, samplingPoints, dateTimeOfSampling } =
      req.body;
    const filePath = req.file.path;
    const parsedStandard = JSON.parse(standard);
    const parsedSamplingPoints = JSON.parse(samplingPoints);

    const fs = require("fs");
    const riceData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!riceData.grains) {
      return res.status(400).send("Invalid rice data");
    }

    const { grains, imageURL } = riceData;
    const { standardData } = parsedStandard;

    const [composition, defectRice] = CompositionAndDefectRice(
      grains,
      standardData
    );
    const selectedSamplingPoints = Object.keys(parsedSamplingPoints).filter(
      (key) => parsedSamplingPoints[key]
    );

    console.log(selectedSamplingPoints);

    const newRiceInfo = new RiceInfo({
      imageURL,
      name,
      inspectionId: `MT-${Date.now()}`,
      standard: parsedStandard.name,
      totalSample: grains.length,
      note,
      price,
      dateTimeOfSampling,
      samplingPoint: selectedSamplingPoints,
      composition,
      defectRice,
    });

    await newRiceInfo.save();
    fs.unlinkSync(filePath);
    res.status(201).json(newRiceInfo);
  } catch (error) {
    res.status(500).send("Error Post History");
  }
};
exports.deleteHistory = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Dont have IDs" });
    }

    const result = await RiceInfo.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
};

exports.editHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await RiceInfo.findOneAndUpdate(
      { inspectionId: id },
      req.body,
      {
        new: true,
      }
    ).exec();
    res.send(update);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
