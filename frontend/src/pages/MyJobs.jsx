import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { getMyJobs, deleteJob } from "../features/jobs/jobSlice";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  console.log("JOB:", jobs);

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Posted Jobs
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {jobs?.map((job) => (

          <div
            key={job._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >

            <h3 className="font-bold text-lg">
              {job.title}
            </h3>

            <p className="text-gray-600">
              {job.company}
            </p>

            <p className="text-sm text-gray-500">
              📍 {job.location}
            </p>

            {/* Buttons */}

            <div className="flex gap-3 mt-4">

              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              <button
  onClick={() => navigate(`/applications/${job._id}`)}
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Applicants
</button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyJobs;