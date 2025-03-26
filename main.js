const express = require("express");
const { randomUUID } = require("node:crypto");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = 3000;

const users = [
    {
        id: 1,
        login: "admin",
        password: "admin",
    },
    {
        id: 2,
        login: "user",
        password: "user",
    }
];

const sessions = [];

const options = {
    root: path.join(__dirname, "pages"),
};

app.use(express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.cookie("key", "123", { httpOnly: true });
    res.sendFile("index.html", options);
});

app.get("/secret", (req, res) => {
    const sessionKey = req.cookies.session;
    if (!sessionKey) {
        return res.status(403).send("Доступ запрещен");
    }
    if (!sessions.includes(sessionKey)) {
        return res.status(403).send("Доступ запрещен");
    }
    return res.sendFile("second.html", options);
});

app.get("/auth", (req, res) => {
    const errors = {};  
    const data = req.query;

    if (!data.login || data.login?.length === 0) {
        errors.login = "Вы не указали логин";
    }
    if (!data.password || data.password?.length === 0) {
        errors.password = "Вы не указали пароль";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    const foundUser = users.find(user => 
        user.login === data.login && 
        user.password === data.password
    );

    if (!foundUser) {
        return res.status(401).send("Пользователь с таким логином и паролем не найден!");
    }

    const sessionKey = randomUUID();
    sessions.push(sessionKey);
    res.cookie("session", sessionKey, { path: "/", httpOnly: true });
    res.status(200).sendFile("second.html", options);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});