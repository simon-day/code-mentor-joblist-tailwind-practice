import React from "react";

const JobBoardItem = ({job: {
  logo, 
  company, 
  location, 
  contract, 
  postedAt, 
  new : newJob,
  languages,
  tools,
  level,
  position}}) => {

    const skills = [...languages, ...tools]

  return (
    <div className="flex m-4 bg-white shadow-md p-6">
      <div>
        <img src={`../${logo}`} alt={company}/>
      </div>

      <div className="flex flex-col justify-between ml-4">
        <h3 className="font-bold text-teal-500">{company}</h3>
        <h2 className="font-bold text-xl">{position}</h2>
        <p className="text-gray-700">
          {postedAt} • {contract} • {location}
        </p>
      </div>

      <div className="flex items-center ml-auto"> 
        {skills ? skills.map(skills => <span className="bg-teal-100 p-2 m-2 rounded text-teal-500 font-bold ">{skills}</span> ) : null}
      </div>
    </div>
  );
};

export default JobBoardItem;
