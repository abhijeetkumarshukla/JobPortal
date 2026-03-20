import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applyJobAPI, getApplicationsByJobAPI, getMyApplicationsAPI } from "./applicationAPI";

export const applyJob = createAsyncThunk(
  "applications/applyJob",
  async (jobId) => {
    return await applyJobAPI(jobId);
  }
);

export const getMyApplications = createAsyncThunk(
  "applications/getMyApplications",
  async () => {
    return await getMyApplicationsAPI();
  }
);

export const getApplicationsByJob = createAsyncThunk(
  "applications/getByJob",
  async (jobId) => {
    return await getApplicationsByJobAPI(jobId);
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
  applications: [],
   appliedJobs: [],
  loading: false,
  success: false,
  error: null,
},
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getMyApplications.fulfilled, (state, action) => {
      state.applications = action.payload.applications;
    });

    builder.addCase(getApplicationsByJob.fulfilled, (state, action) => {
  state.applications = action.payload.applications;
});

builder
  .addCase(applyJob.pending, (state) => {
    state.loading = true;
    state.success = false;
  })
  .addCase(applyJob.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;

    // ✅ store applied job id
    state.appliedJobs.push(action.meta.arg);
  })
  .addCase(applyJob.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });
  },
});

export default applicationSlice.reducer;