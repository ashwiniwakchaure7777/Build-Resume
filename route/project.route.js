const express = require("express");

const { authentication } = require("../middleware/authentication");

const projectController = require("../controller/project.controller");

const route = express.Router();

route.use(authentication);

//Project Route

route.post("/create-project", projectController?.createProject);
route.put("/update-project/:projectId", projectController?.updateProject);
route.delete("/delete-project/:projectId", projectController?.deleteProject);

module.exports = route;
