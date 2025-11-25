import { SAMPLE_JOBS } from "../../data/sampleJobs.js";
import JobCard from "./JobCard.jsx";
export default function JobList(){ return (<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>{SAMPLE_JOBS.map(j=> <JobCard job={j} key={j.id} />)}</div>); }
