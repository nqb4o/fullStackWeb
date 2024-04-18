import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); //Specifies the public file storage directory
    app.set("view engine", "ejs"); //Specifies the template engines EJS
    app.set("views", "./src/views")
}

module.exports = configViewEngine;