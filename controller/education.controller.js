const EDUCATION_MODEL = require("../model/education.model");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createEducation = async (req, res) => {
  try {
    const {
      resumeId = "",
      institution = "",
      startDate,
      endDate,
      cityCountryCGPA = "",
      courseProject = "",
    } = req.body;

    const userId = req.user.id;

    const payload = {
      userId,
      resumeId,
      institution,
      startDate,
      endDate,
      cityCountryCGPA,
      courseProject,
    };

    const education = await EDUCATION_MODEL.create({
      userId,
      resumeId,
      institution,
      startDate,
      endDate,
      cityCountryCGPA,
      courseProject,
    });

    if (!education) {
      return res
        .status(400)
        .json({ success: false, message: "education not created" });
    }
    res.status(200).json({
      success: true,
      message: "Education created successfully",
      education,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.updateEducation = async (req, res) => {
  try {
    const { eduId } = req.params;
    const {
      resumeId,
      institution,
      startDate,
      endDate,
      cityCountryCGPA,
      courseProject,
    } = req.body;

    const userId = req.user.id;

    const payload = {
      userId,
      resumeId,
      institution,
      startDate,
      endDate,
      cityCountryCGPA,
      courseProject,
    };

    const newEducation = await EDUCATION_MODEL.findByIdAndUpdate(
      { _id: eduId },
      payload,
      { new: true }
    );

    if (!newEducation) {
      return res
        .status(400)
        .json({ success: false, message: "Education document not updated" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "education document updated successfully",
      });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteEductaion = async (req, res) => {
  try {
    const { eduId } = req.params;

    const isEdu = await EDUCATION_MODEL.findById(eduId);

    if (!isEdu) {
      return res
        .status(400)
        .json({ success: false, message: "Provide correct educationId" });
    }

    await EDUCATION_MODEL.deleteOne({ _id: eduId });

    res
      .status(200)
      .json({
        success: true,
        message: "Education document deleted successfully",
      });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
