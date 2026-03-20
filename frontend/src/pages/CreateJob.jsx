import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../features/jobs/jobSlice";

const CreateJob = () => {

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(createJob(form));

    alert("Job Created!");

  };

  return (

    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded w-full max-w-lg space-y-4"
      >

        <h2 className="text-xl font-bold">
          Create Job
        </h2>

        <input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />
        <input
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <button
          className="bg-green-600 text-white p-3 w-full rounded"
        >
          Create Job
        </button>

      </form>

    </div>

  );

};

export default CreateJob;