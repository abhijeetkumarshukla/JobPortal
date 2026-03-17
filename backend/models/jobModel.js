const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
     
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("job", jobSchema);

module.exports = JobModel;