const express = require("express");
const router = express.Router();
const path = require("path");

// Regex: ^ start of line, $ mean end of line
// This mean 2 case "/" and "/index(.html)"
// Can replace "^/$" by "/"
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/test(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = router;
