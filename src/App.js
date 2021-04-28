import React, { useState, useEffect } from "react";
import JobBoardItem from "./components/JobBoardItem";
import data from "./data/data.json";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // ADD API LATER
    setJobs(data);
    setFilteredJobs(data);
  }, []);

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredJobs(data);
      return;
    }

    let jobsCopy = [
      ...jobs.filter((job) => {
        const tags = [...job.tools, ...job.languages, job.role, job.level];
        return filters.every((filter) => tags.includes(filter));
      }),
    ];

    setFilteredJobs(jobsCopy);
  }, [filters, jobs]);

  const clickTagHandler = (tag) => {
    if (filters.some((flt) => flt === tag)) return;
    setFilters([...filters, tag]);
  };

  const clickFilterHandler = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return (
    <>
      <header className="bg-teal-500 mb-12">
        <img
          className="w-full"
          alt="job board header"
          src="/images/bg-header-desktop.svg"
        />
      </header>
      <div className="container m-auto">
        {filters.length > 0 && (
          <div className="bg-white shadow-md flex flex-wrap my-16 mx-10 p-6 z-50">
            {filters.map((filter) => (
              <span
                className="cursor-pointer mr-1 my-3"
                key={filter}
                onClick={() => clickFilterHandler(filter)}
              >
                <span className="bg-teal-100 p-2  rounded-l-md text-teal-500 font-semibold md:mb-0 ">
                  {filter}
                </span>
                <span className="bg-teal-600 text-teal-100  rounded-r-md cursor-pointer font-bold  mr-4 my-2 p-2 ">
                  x
                </span>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="font-bold text-gray-600 ml-auto"
            >
              Clear
            </button>
          </div>
        )}
        {jobs.length === 0 ? (
          <p>Fetching...</p>
        ) : (
          filteredJobs.map((job) => (
            <JobBoardItem
              clickTagHandler={clickTagHandler}
              key={job.id}
              job={job}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
