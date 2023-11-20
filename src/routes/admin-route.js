const express = require("express");

const router = express.Router();
const adminAuthenticate = require("../middlewares/adminAuthenticate");
const adminController = require("../controllers/admin-controller");
router.post("/create", adminAuthenticate, adminController.createCourse);

module.exports = router;
