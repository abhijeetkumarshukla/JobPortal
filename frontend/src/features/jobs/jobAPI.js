import axios from "../../api/axios";

export const fetchJobsAPI = async () => {
  const res = await axios.get("/job/all");
  return res.data;
};

export const createJobAPI = async (data) => {
  const res = await axios.post("/job/create", data);
  return res.data;
};

export const getMyJobsAPI = async () => {
  const res = await axios.get("/job/myjobs");
  return res.data;
};

export const deleteJobAPI = async (id) => {
  const res = await axios.delete(`/job/job/${id}`);
  return res.data;
};

export const updateJobAPI = async (id, data) => {
  const res = await axios.put(`/job/job/${id}`, data);
  return res.data;
};