import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getApplicationsByJob } from "../features/applications/applicationSlice";
import { updateApplicationStatusAPI } from "../features/applications/applicationAPI";

const JobApplications = () => {

  const { jobId } = useParams();
  const dispatch = useDispatch();

  const { applications } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(getApplicationsByJob(jobId));
  }, [dispatch, jobId]);

  const handleStatus = (id, status) => {
  dispatch(updateApplicationStatusAPI({ id, status }));
};

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Applicants
      </h2>

      {applications?.map((app) => (

        <div
          key={app._id}
          className="border p-4 mb-4 rounded shadow"
        >

          <h3 className="font-bold">
            {app.user.name}
          </h3>

          <p>{app.user.email}</p>

          <p className="text-sm text-gray-500">
            Status: {app.status}
          </p>

          <div className="flex gap-3 mt-3">
<button
  onClick={() => handleStatus(app._id, "accepted")}
  className="bg-green-600 text-white px-3 py-1 rounded"
>
  Accept
</button>

<button
  onClick={() => handleStatus(app._id, "rejected")}
  className="bg-red-600 text-white px-3 py-1 rounded"
>
  Reject
</button>
          </div>

        </div>

      ))}

    </div>
  );
};

export default JobApplications;