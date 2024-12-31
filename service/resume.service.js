const CERTIFICATE_MODEL = require("../model/certificate.model");
const EDUCATION_MODEL = require("../model/education.model");
const PROJECT_MODEL = require("../model/project.model");
const RESUME_MODEL = require("../model/resume.model");
const WORK_MODEL = require("../model/work.model");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createResume = async (payload, res) => {
  try {
    const createdResume = await RESUME_MODEL.create(payload);
    return createdResume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.findResume = async (query, res) => {
  try {
    const resume = await RESUME_MODEL.findOne(query);
    return resume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.findandUpdateResume = async (query, update, options, res) => {
  try {
    const resume = await RESUME_MODEL.findOneAndUpdate(query, update, options);
    return resume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.findandUpdateResumeOtherFields = async (
  documents,
  resumeId,
  type,
  res
) => {
  try {
    let myModel;

    // Determine the model based on the type
    switch (type) {
      case "work":
        myModel = WORK_MODEL;
        break;
      case "education":
        myModel = EDUCATION_MODEL;
        break;
      case "certificate":
        myModel = CERTIFICATE_MODEL;
        break;
      case "project":
        myModel = PROJECT_MODEL;
        break;
      default:
        throw new Error("Unknown document type");
    }

    myModel.findOneAndUpdate({ }, documentPayload, {
      upsert: true,
      new: true,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteResumeService = async (query, res) => {
  try {
    const resume = await RESUME_MODEL.findOneAndDelete(query);
    return resume;
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
