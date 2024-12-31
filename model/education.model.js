const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  studyProgram: {
    type: String,
  },
  type: {
    type: String,
    default: "education",
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resume",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  institution: {
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
  cityCountryCGPA: {
    type: String,
  },
  courseProject: {
    type: String,
  },
});

const EDUCATION_MODEL = mongoose.model("education", educationSchema);

module.exports = EDUCATION_MODEL;
