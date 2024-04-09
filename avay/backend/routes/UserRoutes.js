const express = require("express");
const InsertController = require("../controller/InsertController");
const LoginController = require("../controller/LoginController");
const Fetch = require("../controller/FetchingController");

const route = express.Router();

// Routes that do not require authentication
route.post("/register", InsertController.register);
route.post("/login", LoginController.login);
route.post("/logout", LoginController.logout);
route.get("/getuser", Fetch.getUser);

module.exports = route;
