const JobModel = require("../models/jobModel");


// CREATE JOB
const createJob = async (req, res) => {
  const { title, description, company, location , salary } = req.body;

  try {
    const newJob = new JobModel({
      title,
      description,
      company,
      location,
      salary,
      createdBy: req.user.id, // 👈 who created the job
    });

    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error occurred while creating job",
      error: error.message,
    });
  }
};



// GET ALL JOBS + SEARCH + PAGINATION
const getAllJobs = async (req, res) => {
  try {

    const { keyword, location, page = 1, limit = 10 } = req.query;

    let query = {};

    // 🔎 Search by title
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // 📍 Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await JobModel.find(query)
      .populate("createdBy", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await JobModel.countDocuments(query);

    res.status(200).json({
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching jobs",
      error: error.message,
    });
  }
};


const getSingleJob = async (req, res) => {
  try {

    const job = await JobModel.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });

  } catch (error) {
    res.status(500).json({ message: "Error fetching job" });
  }
};

const deleteJob = async (req, res) => {
  try {

    const job = await JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
};


const updateJob = async (req, res) => {
  try {

    const job = await JobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Job updated",
      job
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating job" });
  }
};


const getMyJobs = async (req, res) => {
  try {

    const jobs = await JobModel.find({
      createdBy: req.user.userID
    });

    res.status(200).json({
      message: "Recruiter jobs fetched",
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching recruiter jobs",
      error: error.message
    });
  }
};


module.exports = { createJob, getAllJobs, getSingleJob, deleteJob, updateJob, getMyJobs };