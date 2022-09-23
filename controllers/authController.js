const bcrypt = require("bcrypt");

const usersDb = {
    users: require("../models/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
};

const handleLogin = async (req, res) => {
    const { username, pwd } = req.body;
    if (!username || !pwd)
        return res.json({ message: "username and password are required" });
    const foundUser = usersDb.users.find((user) => user.username === username);
    if (!foundUser)
        return res.status(401).json({ message: "username not found" });
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        res.json({ message: `${username} is logged in` });
    } else {
        res.status(401).json({ message: "password invalid" });
    }
};

module.exports = {
    handleLogin,
};
