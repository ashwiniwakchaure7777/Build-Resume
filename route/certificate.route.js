const express = require("express");
const { authentication } = require("../middleware/authentication");
const certificateController = require("../controller/certificate.controller");

const route = express.Router();

route.use(authentication);

//Certificate route
route.post("/create-certificate", certificateController?.createCertificate);
route.put(
  "/update-certificate/:certificateId",
  certificateController?.updateCertificate
);
route.delete(
  "/delete-certificate/:certificateId",
  certificateController?.deleteCertificate
);

module.exports = route;
