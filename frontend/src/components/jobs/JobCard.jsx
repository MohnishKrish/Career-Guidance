import React, { useState } from "react";
import ApplyModal from "./ApplyModal.jsx";

export default function JobCard({ job }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <ApplyModal 
          job={job} 
          onClose={() => setOpen(false)} 
        />
      )}

      <div className="glass p-4 rounded-xl h-full flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="opacity-70">{job.company} • {job.location}</p>
          <p className="text-sm mt-1 text-green-400">{job.salary}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {job.skills.map((s, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded bg-white/6 text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <small className="text-xs opacity-70">{job.date}</small>

          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 bg-purple-600 rounded"
          >
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
}