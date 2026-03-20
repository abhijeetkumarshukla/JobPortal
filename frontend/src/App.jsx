import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import MyApplications from "./pages/MyApplications";
import CreateJob from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import JobApplications from './pages/JobApplications';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/"
            element={
              <DashboardLayout>
                <JobList />
              </DashboardLayout>
            }
          />
          <Route path="/applications/:jobId" element={<JobApplications/>} />

          <Route
            path="/my-applications"
            element={
              <DashboardLayout>
                <MyApplications />
              </DashboardLayout>
            }
          />

          <Route
            path="/create-job"
            element={
              <DashboardLayout>
                <CreateJob />
              </DashboardLayout>
            }
          />

          <Route
            path="/my-jobs"
            element={
              <DashboardLayout>
                <MyJobs />
              </DashboardLayout>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;