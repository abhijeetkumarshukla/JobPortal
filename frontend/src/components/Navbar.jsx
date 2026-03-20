import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        Job Portal
      </h1>

      <div className="space-x-6">

        <Link to="/">Jobs</Link>

        <Link to="/my-applications">
          My Applications
        </Link>

        <Link to="/create-job">
          Create Job
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;