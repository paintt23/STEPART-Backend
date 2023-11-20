const express = require("express");
const couresController = require("../controllers/coures-controller");
const authenticateMiddleware = require("../middlewares/authenticate");
const router = express.Router();

router.post("/", authenticateMiddleware, couresController.createCoures);
router.post("/order", authenticateMiddleware, couresController.createOrder);
router.get("", couresController.getCoures);
router.delete(
  "/:couresId",
  authenticateMiddleware,
  couresController.deleteCoures
);
module.exports = router;
