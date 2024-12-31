const CERTIFICATE_MODEL = require("../model/certificate.model");
const ERROR_RESPONSE = require("../utils/handleError");

module.exports.createCertificate = async (req, res) => {
  try {
    const {
      resumeId = "",
      certificateName = "",
      certificateDescription = "",
    } = req.body;

    if (!certificateName) {
      return res
        .status(200)
        .json({ success: false, message: "Certificate name required" });
    }
    const userId = req.user.id;

    const certificate = await CERTIFICATE_MODEL.create({
      userId,
      resumeId,
      certificateName,
      certificateDescription,
    });

    if (!certificate) {
      return res
        .status(400)
        .json({ success: false, message: "Certificate not created" });
    }
    res.status(200).json({
      success: true,
      message: "Certificate is created successfully",
      certificate,
    });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.updateCertificate = async (req, res) => {
  try {
    const { resumeId, certificateName, certificateDescription } = req.body;
    const { certificateId } = req.params;

    const certificate = await CERTIFICATE_MODEL.findByIdAndUpdate(
      { _id: certificateId },
      { resumeId, certificateName, certificateDescription },
      { new: true }
    );

    if (!certificate) {
      return res
        .status(400)
        .json({ success: false, message: "Certificate update issue" });
    }

    res
      .status(200)
      .json({ success: true, message: "Certificate updated successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};

module.exports.deleteCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const isCertificate = await CERTIFICATE_MODEL.findById(certificateId);

    if (!isCertificate) {
      return res
        .status(400)
        .json({ success: false, message: "Certificate not found" });
    }

    await CERTIFICATE_MODEL.deleteOne({ _id: certificateId });

    res
      .status(200)
      .json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    ERROR_RESPONSE(res, error);
  }
};
