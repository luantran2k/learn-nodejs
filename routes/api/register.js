const express = require("express");
const { handlerNewUser } = require("../../controllers/registerController");
const router = express.Router();

router.route("/").post(handlerNewUser);

module.exports = router;
