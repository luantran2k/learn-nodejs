const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);

const whiteList = [
    "http://localhost:3000",
    "http://localhost:3500",
    "https://www.google.com",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/index(.html)?", (req, res) => {
    res.redirect(301, "/");
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/product(.json)?", (req, res) => {
    const products = [
        { id: 1, name: "xoong" },
        { id: 2, name: "noi" },
        { id: 3, name: "chao" },
        { id: 4, name: "dao" },
        { id: 5, name: "dia" },
    ];
    res.contentType("application/json").json(products);
});

app.get("/img", (req, res) => {
    res.contentType("image/png").sendFile(
        path.join(__dirname, "img", "img1.png")
    );
});

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
