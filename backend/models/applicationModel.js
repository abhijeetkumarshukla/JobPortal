const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },

    resume: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);


const ApplicationModel = mongoose.model("application", applicationSchema);

module.exports = ApplicationModel;