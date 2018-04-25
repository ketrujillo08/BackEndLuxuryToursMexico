var express = require("express");
var app = express();

app.get("/", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Success Request"
    });
});

module.exports = app;