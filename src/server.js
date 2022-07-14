const express = require("express");
const morgan = require("morgan"); // request logger (middleware)
const path = require("path");
const { users } = require("../public/users.json");

let port = 8080;
const app = express();

app.use(express.json());
app.use(morgan("dev")); // .use = any route (get, post, etc)

app.get("/", (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    } catch (err) {
        next(err);
    }
});

app.get("/about", (req, res, next) => {
    try {
        res.json({ name: "Emma", city: "Nashville" });
    } catch (err) {
        next(err);
    }
});

app.post("/echo", (req, res, next) => {
    try {
        const { url, method, body } = req;

        res.json({ url, method, body });
    } catch (err) {
        next(err);
    }
});

app.get("/user/:username", (req, res, next) => {
    try {
        let { username } = req.params;
        let user = users.find(
            (u) => u.username.toLowerCase() == username.toLowerCase()
        );
        res.json(user || { msg: `No user exists with ${username} username.` });
    } catch (err) {
        next(err);
    }
});

// 404 Handler
app.use((req, res, next) => {
    try {
        res.status(404).sendFile(path.join(__dirname, "../public/notFound.html"));
    } catch (err) {
        next(err);
    }
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res
    .status(e.status || 500)
    .json({
        error: err.name,
        message: err.message,
        date: new Date().toString(),
    });
});

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);
