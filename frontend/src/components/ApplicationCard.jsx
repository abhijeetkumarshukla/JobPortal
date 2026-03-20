/* eslint-disable react/prop-types */
const ApplicationCard = ({ app }) => {
  return (
    <div className="border p-4 rounded shadow">

      <h2 className="font-bold">{app.job.title}</h2>
      <p>{app.job.company}</p>

      <span className="text-blue-600">
        Status: {app.status}
      </span>

    </div>
  );
};

export default ApplicationCard;