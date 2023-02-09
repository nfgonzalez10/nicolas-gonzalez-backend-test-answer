const express = require("express");
const router = express.Router();
const authVerification = require("./authVerification");
const productsController = require("../controllers/productsController");

router.post(
  "",
  authVerification.middleVerification,
  productsController.insertTestProducts
);

router.get(
  "",
  authVerification.middleVerification,
  productsController.getAllProducts
);

module.exports = router;
