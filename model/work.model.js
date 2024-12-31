const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "work",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resume",
    },
    workPosition: {
      type: String,
    },
    companyName: {
      type: String,
    },
    startDate: {
      type: Date,
      default: new Date(),
    },
    endDate: {
      type: Date,
      default: new Date(),
    },
    companyDescription: {
      type: String,
    },
    taskAchiement: {
      type: String,
    },
    contact: [
      {
        contactPerson: { type: String },
        contactInfo: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WORK_MODEL = mongoose.model("work", workSchema);

module.exports = WORK_MODEL;
