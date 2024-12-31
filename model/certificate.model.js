const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "certificate",
    },
    userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resume",
    },
    certificateName: {
      type: String,
    },
    certificateDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const CERTIFICATE_MODEL = mongoose.model('certificate',certificateSchema);

module.exports = CERTIFICATE_MODEL;