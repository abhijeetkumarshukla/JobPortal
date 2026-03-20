import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "../features/applications/applicationSlice";
import ApplicationCard from "../components/ApplicationCard";

const MyApplications = () => {

  const dispatch = useDispatch();

  const { applications } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {

    dispatch(getMyApplications());

  }, [dispatch]);

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Applications
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {applications?.map((app) => (

          <ApplicationCard key={app._id} app={app} />

        ))}

      </div>

    </div>

  );

};

export default MyApplications;