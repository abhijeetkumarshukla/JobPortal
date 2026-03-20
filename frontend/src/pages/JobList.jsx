import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobs/jobSlice";
import JobCard from "../components/JobCard";

const JobList = () => {

  const dispatch = useDispatch();

  const { jobs } = useSelector((state) => state.jobs);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const jobsPerPage = 6;

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // 🔎 Search filter
  const filteredJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const startIndex = (page - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  return (

    <div className="p-6">

      {/* Title */}

      <h2 className="text-2xl font-bold mb-6">
        Available Jobs
      </h2>

      {/* Search */}

      <input
        type="text"
        placeholder="Search jobs, company, location..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border p-3 rounded w-full mb-6"
      />

      {/* Job Cards */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <p>No jobs found</p>
        )}

      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

};

export default JobList;