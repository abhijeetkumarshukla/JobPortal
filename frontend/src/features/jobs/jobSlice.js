import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobsAPI, createJobAPI, getMyJobsAPI, deleteJobAPI, updateJobAPI } from "./jobAPI";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async () => {
    return await fetchJobsAPI();
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (data) => {
    return await createJobAPI(data);
  }
);

export const getMyJobs = createAsyncThunk(
  "jobs/getMyJobs",
  async () => {
    return await getMyJobsAPI();
  }
);
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id) => {
    return await deleteJobAPI(id);
  }
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, data }) => {
    return await updateJobAPI(id, data);
  }
);

export const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
    });

    builder.addCase(getMyJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
    });

    builder.addCase(createJob.fulfilled, (state, action) => {
      state.jobs.push(action.payload.job);
    });

    builder.addCase(deleteJob.fulfilled, (state, action) => {
    state.jobs = state.jobs.filter(
    (job) => job._id !== action.meta.arg
  );
});

    builder.addCase(updateJob.fulfilled, (state, action) => {
      state.jobs = state.jobs.map((job) => {
        if (job._id === action.meta.arg.id) {
          return { ...job, ...action.payload.job };
        }
        return job;
      });
    });

  },
});

export default jobSlice.reducer;