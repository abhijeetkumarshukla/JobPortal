/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../features/applications/applicationSlice";
import { useState, useEffect } from "react";

const JobCard = ({ job }) => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loading, success, appliedJobs } = useSelector(
    (state) => state.applications
  );

  const [showToast, setShowToast] = useState(false);

  const isApplied = appliedJobs.includes(job._id);

  const handleApply = () => {
    if (!isApplied) {
      dispatch(applyJob(job._id));
    }
  };

  useEffect(() => {
    if (success) {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [success]);

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">

      <h2 className="text-lg font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">📍 {job.location}</p>

      {user?.role === "user" && (
        <button
          onClick={handleApply}
          disabled={loading || isApplied}
          className={`px-4 py-2 mt-2 rounded text-white 
            ${isApplied ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"}
            ${loading ? "opacity-50" : ""}
          `}
        >
          {loading
            ? "Applying..."
            : isApplied
            ? "Applied ✅"
            : "Apply"}
        </button>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-3 rounded shadow-lg">
          ✅ Applied Successfully!
        </div>
      )}

    </div>
  );
};

export default JobCard;