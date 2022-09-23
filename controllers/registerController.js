const bcryp = require("bcrypt");
const fsPromise = require("fs").promises;
const path = require("path");

const userDB = {
    users: require("../models/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
};

const handlerNewUser = async (req, res) => {
    const { username, pwd } = req.body;
    if (!username || !pwd)
        return res.json({ message: "username and password are required" });

    const dublicate = userDB.users.find((user) => user.username === username);
    console.log(dublicate);
    if (dublicate) return res.sendStatus(409); //Conflict
    try {
        const hashedPwd = await bcryp.hash(pwd, 10);
        const newUser = { username, password: hashedPwd };
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromise.writeFile(
            path.join(__dirname, "..", "models", "users.json"),
            JSON.stringify(userDB.users)
        );
        res.json({ message: `user ${username} created!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    handlerNewUser,
};
