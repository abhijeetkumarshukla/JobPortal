const express = require('express');
const { applyJob, getAllApplications, getMyApplications, updateApplicationStatus } = require('../controllers/applicationControllers');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const applicationRouter = express.Router();

applicationRouter.post('/apply/:jobId', authMiddleware, roleMiddleware("user"), applyJob);
applicationRouter.get('/all',authMiddleware,roleMiddleware("admin"), getAllApplications) 
applicationRouter.get('/my', authMiddleware, roleMiddleware("user"), getMyApplications)
applicationRouter.patch("/status/:applicationId",authMiddleware, roleMiddleware("recruiter","admin"),updateApplicationStatus);

module.exports = applicationRouter