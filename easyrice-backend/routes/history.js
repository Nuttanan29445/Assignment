const express = require("express");
const {
  postHistory,
  getAllHistory,
  getHistoryByID,
  deleteHistory,
  editHistory,
} = require("../controllers/history");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/history", getAllHistory);

router.get("/history/:id", getHistoryByID);

router.post("/history", upload.single("file"), postHistory);

router.put("/history/:id", editHistory);

router.delete("/history", deleteHistory);

module.exports = router;
