import API from "../../api/axios";

export const applyJobAPI = async (jobId) => {
  const res = await API.post(`/application/apply/${jobId}`);
  return res.data;
};

export const getMyApplicationsAPI = async () => {
  const res = await API.get("/application/my");
  return res.data;
};

export const getAllApplicationsAPI = async () => {
  const res = await API.get("/application/all");
  return res.data;
};

export const updateApplicationStatusAPI = async (id, status) => {
  const res = await API.patch(`/application/status/${id}`, { status });
  return res.data;
};

export const getApplicationsByJobAPI = async (jobId) => {
  const res = await API.get(`/application/job/${jobId}`);
  return res.data;
};