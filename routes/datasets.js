const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const multer = require("multer");
const datasets = require("../controllers/datasets");
const catchAsync = require("../utils/catchAsync");

// Multer Storage

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploads = multer({ storage: storage });

router.get("/", isLoggedIn, catchAsync(datasets.index));

router.get("/new", isLoggedIn, datasets.renderNewForm);

router.post("/new", catchAsync(datasets.create));

router.post("/", isLoggedIn, uploads.single("csv"), datasets.uploadCSV);

router.post("/export", datasets.exportCSV);

router.get("/:id", isLoggedIn, catchAsync(datasets.renderEditForm));

router.put("/:id", isLoggedIn, catchAsync(datasets.edit));

module.exports = router;
