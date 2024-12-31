const express = require("express");
const { authentication } = require("../middleware/authentication");
const workController = require("../controller/work.Controller");

const route = express.Router();

route.use(authentication);

//Work Route

route.post("/create-work", workController?.createWork);
route.put("/update-work/:workId", workController?.updateWork);
route.delete("/delete-work/:workId", workController?.deleteWork);

module.exports = route;
