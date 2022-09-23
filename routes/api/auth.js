const { handleLogin } = require("../../controllers/authController");

const router = require("express").Router();
router.route("/").post(handleLogin);
module.exports = router;
