const WORK_MODEL = require("../model/work.model");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createWork = async (req, res) => {
  try {
    const {
      resumeId,
      workPosition = "",
      companyName = "",
      startDate,
      endDate,
      companyDescription = "",
      taskAchiement = "",
      contact = [],
    } = req.body;

    if (!companyName || !workPosition) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide required details" });
    }

    const user = req.user;
    const userId = user.id;

    const payload = {
      userId,
      resumeId,
      workPosition,
      companyName,
      startDate,
      endDate,
      companyDescription,
      taskAchiement,
      contact,
    };

    const work = await WORK_MODEL.create(payload);

    if (!work) {
      return res.status(400).json({
        success: false,
        message: "Issue in creating the work document",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "work created successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.updateWork = async (req, res) => {
  try {
    const { workId } = req.params;
    const {
      resumeId,
      workPosition,
      companyName,
      startDate,
      endDate,
      companyDescription,
      taskAchiement,
      contact = [],
    } = req.body;

    const payload = {
      resumeId,
      workPosition,
      companyName,
      startDate,
      endDate,
      companyDescription,
      taskAchiement,
      contact,
    };
    const work = await WORK_MODEL.findById(workId);

    if (!work) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide correct work id" });
    }

    const workUpdated = await WORK_MODEL.findByIdAndUpdate(
      { _id: workId },
      payload,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "work created successfully",
      workUpdated,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteWork = async (req, res) => {
  try {
    const { workId } = req.params;

    const work = await WORK_MODEL.findById(workId);

    if (!work) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Word document not available in database",
        });
    }

    await WORK_MODEL.deleteOne({ _id: workId });

    res
      .status(200)
      .json({ success: true, message: "Work deleted successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
