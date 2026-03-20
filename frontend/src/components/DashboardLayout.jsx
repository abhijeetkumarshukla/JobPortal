import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <div className="w-64 bg-blue-700 text-white p-6 space-y-6">

        <h2 className="text-2xl font-bold">
          Job Portal
        </h2>

        <nav className="flex flex-col space-y-4">

          <Link to="/">Jobs</Link>

          {role === "user" && (
            <Link to="/my-applications">
              My Applications
            </Link>
          )}

          {role === "recruiter" && (
            <>
              <Link to="/create-job">Create Job</Link>
              <Link to="/my-jobs">My Jobs</Link>
            </>
          )}

          {role === "admin" && (
            <Link to="/admin/applications">
              All Applications
            </Link>
          )}

        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-2 rounded mt-6"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-8">

        {children}

      </div>

    </div>

  );

};

export default DashboardLayout;