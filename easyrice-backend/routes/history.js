const express = require("express");
const {
  postHistory,
  getAllHistory,
  getHistoryByID,
  deleteHistory,
  editHistory,
} = require("../controllers/history");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/history", getAllHistory);

router.get("/history/:id", getHistoryByID);

router.post("/history", upload.single("file"), postHistory);

router.put("/history/:id", editHistory);

router.delete("/history", deleteHistory);

module.exports = router;
