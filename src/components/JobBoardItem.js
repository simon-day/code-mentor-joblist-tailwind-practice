import React from "react";

const JobBoardItem = ({clickTagHandler, job: {
  logo, 
  company, 
  location, 
  contract, 
  postedAt, 
  new : newJob,
  languages,
  featured,
  role,
  tools,
  level,
  position}}) => {

    const tags = [role, level, ...languages, ...tools]

  return (
    <div className={`flex m-10 my-16 flex-col bg-white shadow-md p-6 rounded ${featured && 'border-l-4 border-teal-500'} md:flex-row md:my-6`}>
      <div>
        <img  className="-mt-16 mb-4 w-20 h-20  md:h-24 md:w-24 md:object-contain md:my-0" src={`../${logo}`} alt={company}/>
      </div>

      <div className="flex flex-col justify-between ml-4">
        <h3 className="text-teal-500 font-semibold ">{company}
        {newJob && (<span className="bg-teal-500 py-1 px-2 m-1 uppercase rounded-full text-sm text-teal-100 font-bold">New</span>) }
        {featured && (<span className="py-1 px-2 rounded-full uppercase text-white  font-bold text-sm bg-gray-800">Featured</span>) }
        </h3>
        <h2 className="font-bold text-xl my-2">{position}</h2>
        <p className="text-gray-700">
          {postedAt} • {contract} • {location}
        </p>
      </div>

      <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-200 border-solid md:ml-auto md:border-0 md:pt-0 md:mt-0 md:justify-end"> 
        {tags ? tags.map(tag => <span key={tag} onClick={() => clickTagHandler(tag)} className="bg-teal-100 p-2 mr-4 mb-4 rounded text-teal-500 font-semibold md:mb-0 ">{tag}</span> ) : null}
      </div>
    </div>
  );
};

export default JobBoardItem;
