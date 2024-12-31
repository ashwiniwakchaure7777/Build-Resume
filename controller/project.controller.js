const PROJECT_MODEL = require("../model/project.model");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createProject = async (req, res) => {
  try {
    const {
      resumeId = "",
      projectName = "",
      startDate,
      endDate,
      projectDescription = "",
    } = req.body;

    const userId = req.user.id;
    if (!projectName) {
      return res
        .status(400)
        .json({ success: false, message: "Provide project name" });
    }
    const project = await PROJECT_MODEL.create({
      userId,
      resumeId,
      projectName,
      startDate,
      endDate,
      projectDescription,
    });

    if (!project) {
      return res
        .status(400)
        .json({ success: false, message: "Project create issue" });
    }

    res.status(200).json({
      success: true,
      message: "Project created succuessfully",
      project,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.updateProject = async (req, res) => {
  try {
    const { resumeId, projectName, startDate, endDate, projectDescription } =
      req.body;
    const { projectId } = req.params;

    const isProject = await PROJECT_MODEL.findById(projectId);
    if (!isProject) {
      return res
        .status(400)
        .json({ success: false, message: "Provide correct project id " });
    }

    const updatedProject = await PROJECT_MODEL.findByIdAndUpdate(
      { _id: projectId },
      { resumeId, projectName, startDate, endDate, projectDescription },
      { new: true }
    );

    if (!updatedProject) {
      return res
        .status(400)
        .json({ success: false, message: "Issue to update project" });
    }
    res.status(200).json({
      success: false,
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const isProject = await PROJECT_MODEL.findById(projectId);

    if (!isProject) {
      return res
        .status(400)
        .json({ success: false, message: "Project not found" });
    }

    await PROJECT_MODEL.deleteOne({ _id: projectId });

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
