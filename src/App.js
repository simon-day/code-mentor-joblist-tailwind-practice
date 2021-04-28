import React, { useState, useEffect } from "react";
import JobBoardItem from "./components/JobBoardItem";
import data from "./data/data.json";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // ADD API LATER
    setJobs(data);
  }, []);

  return (
    <div className="App">
      {jobs.length === 0 ? (
        <p>Fetching...</p>
      ) : (
        jobs.map((job) => <JobBoardItem key={job.id} job={job} />)
      )}
    </div>
  );
}

export default App;
