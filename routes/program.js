const express = require('express');
const router = express.Router();
const program = require("../controllers/program");
const { isLoggedIn, paginatedResults } = require("../middleware");
const catchAsync = require("../utils/catchAsync")

router.get("/", isLoggedIn, catchAsync(program.index));
router.get("/new",isLoggedIn, program.renderNewForm);
router.post("/new", isLoggedIn, catchAsync(program.create));
router.get("/:id",isLoggedIn, catchAsync(program.renderEditForm));
router.put("/:id",isLoggedIn, catchAsync( program.edit));
router.delete("/:id", isLoggedIn, catchAsync(program.delete));
module.exports = router;