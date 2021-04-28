import React, { useState, useEffect } from "react";
import JobBoardItem from "./components/JobBoardItem";
import data from "./data/data.json";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setJobs(data);
    setFilteredJobs(data);
  }, []);

  useEffect(() => {
    if (filters.length === 0 && searchText === "") {
      setFilteredJobs(data);
      return;
    }

    let jobsCopy = [
      ...jobs.filter((job) => {
        const tags = [...job.tools, ...job.languages, job.role, job.level];
        return (
          filters.every((filter) => tags.includes(filter)) &&
          job.position.toLowerCase().includes(searchText.toLowerCase())
        );
      }),
    ];

    setFilteredJobs(jobsCopy);
  }, [filters, jobs, searchText]);

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
          <div className="bg-white shadow-md flex flex-wrap my-16 mx-10 p-6 -mt-24 z-10 relative items-center">
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
        <div className="bg-white shadow p-4 flex mx-10 rounded">
          <span class="w-auto flex justify-end items-center text-gray-500 p-2">
            <i class="material-icons text-3xl">search</i>
          </span>
          <span className=" flex justify-end items-center text-gray-500 "></span>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full rounded p-1 outline-none"
            type="text"
            placeholder="Search jobs, Example: 'Fullstack Developer'"
          />
        </div>
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
