const express = require("express");
const { getStandard } = require("../controllers/standard");

const router = express.Router();

router.get("/standard", getStandard);

module.exports = router;
