const express = require("express");
const router = express.Router();
const identifyController = require("../controllers/identifyController");

router.get("/token", (req, res) => identifyController.getToken(req, res));


module.exports = router;