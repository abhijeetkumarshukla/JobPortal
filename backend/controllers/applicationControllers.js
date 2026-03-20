const ApplicationModel = require("../models/applicationModel");
const JobModel = require("../models/jobModel");


// APPLY JOB
const applyJob = async (req, res) => {
  try {

    const jobId = req.params.jobId;
    const userId = req.user.userID;

    // Check if job exists
    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicate application
    const alreadyApplied = await ApplicationModel.findOne({
      job: jobId,
      user: userId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

    // Create application
    const application = await ApplicationModel.create({
      job: jobId,
      user: userId
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: "Error occurred while submitting application",
      error: error.message
    });
  }
};



// GET ALL APPLICATIONS
const getAllApplications = async (req, res) => {
  try {

    const applications = await ApplicationModel.find()
      .populate("job")
      .populate("user", "name email");

    res.status(200).json({ applications });

  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching applications",
      error: error.message
    });
  }
};



// GET MY APPLICATIONS
const getMyApplications = async (req, res) => {
  try {

    const applications = await ApplicationModel.find({
      user: req.user.userID
    }).populate("job");

    res.status(200).json({ applications });

  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching your applications",
      error: error.message
    });
  }
};



const updateApplicationStatus = async (req, res) => {
  try {

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const application = await ApplicationModel.findByIdAndUpdate(
      req.params.applicationId,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json({
      message: "Application status updated",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating application status",
      error: error.message
    });
  }
};
const getApplicationsByJob = async (req, res) => {
  try {

    const { jobId } = req.params;

    const applications = await ApplicationModel.find({
      job: jobId
    })
      .populate("user", "name email")
      .populate("job", "title");

    res.status(200).json({ applications });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching applications",
      error: error.message
    });
  }
};


module.exports = {
  applyJob,
  getAllApplications,
  getMyApplications,
  updateApplicationStatus,
  getApplicationsByJob
};