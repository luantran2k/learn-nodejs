const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/product(.json)?", (req, res) => {
    const products = [
        { id: 1, name: "xoong" },
        { id: 2, name: "noi" },
        { id: 3, name: "chao" },
        { id: 4, name: "dao" },
        { id: 5, name: "dia" },
    ];
    res.contentType("application/json").json(products);
});

router.get("/img", (req, res) => {
    res.contentType("image/png").sendFile(
        path.join(__dirname, "..", "public", "img", "img1.png")
    );
});

module.exports = router;
