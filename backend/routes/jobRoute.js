const express = require("express");
const { createJob, getAllJobs, getSingleJob, deleteJob, updateJob, getMyJobs } = require("../controllers/jobControllers");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const jobRouter = express.Router();

jobRouter.post("/create", authMiddleware, roleMiddleware("recruiter"), createJob);
jobRouter.get("/all", authMiddleware, roleMiddleware("recruiter", 'admin'), getAllJobs);
jobRouter.get("/job/:id", getSingleJob);
jobRouter.delete("/job/:id", authMiddleware, roleMiddleware("recruiter"), deleteJob);
jobRouter.put("/job/:id", authMiddleware, roleMiddleware("recruiter"), updateJob);
jobRouter.get("/myjobs", authMiddleware, roleMiddleware("recruiter"), getMyJobs);
module.exports = jobRouter;