const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "dd/MM/yyyy-HH:mm:ss a")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
        }
        await fsPromise.appendFile(
            path.join(__dirname, "..", "logs", logName),
            logItem
        );
    } catch (err) {
        console.log(err);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    //console.log(`${req.method} ${req.url}`);
    next();
};

module.exports = { logEvents, logger };
