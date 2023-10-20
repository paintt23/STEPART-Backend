const express = require("express");
const couresController = require("../controllers/coures-controller");
const authenticateMiddleware = require("../middlewares/authenticate");
const router = express.Router();

router.use(authenticateMiddleware);
router.post("/", couresController.createCoures);
module.exports = router;
