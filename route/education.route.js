const express = require("express");
const { authentication } = require("../middleware/authentication");

const educationController = require("../controller/education.controller");

const route = express.Router();

route.use(authentication);

route.post("/create-education", educationController?.createEducation);
route.put("/update-education/:eduId", educationController?.updateEducation);
route.delete("/delete-education/:eduId", educationController?.deleteEductaion);

module.exports = route;
