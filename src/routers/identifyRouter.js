const express = require("express");
const router = express.Router();
const identifyController = require("../controllers/identifyController");
const authVerification = require("./authVerification")

router.get("/token", (req, res) => identifyController.getToken(req, res));

router.post("/user", authVerification.middleVerification, identifyController.newUser)


module.exports = router;