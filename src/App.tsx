import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import jobData from './job-data.json';

const jobsUrl = "https://api.lever.co/v0/postings/plaid?mode=json"
interface JobPosting {
    additional: string; // Text on company values, typically non-discrimination disclaimer.
    applyUrl: string; // URL to apply page.
    categories: JobCategory; // Job category that this job falls into.
    createdAt: number; // Epoch time created.
    description: string; // Role description.
    hostedUrl: string; // Job page.
    id: string; // Job ID.
    lists: JobRequirements[]; // Lists desired experience and describes role.
    text: string; // Job title.
}

interface JobCategory {
    commitment: string;
    department: string;
    location: string;
    team: string;
}

interface JobRequirements {
    content: string;
    text: string;
}



function JobPost(props: { post: JobPosting }) {
  const { post } = props;
  return (
    <div className="job-post">
      <div className="job-title">{post.text}</div>
      <div className="job-details">
        <div className="job-detail job-location">{post.categories.location}</div>
        <div className="job-detail job-department">{post.categories.department}</div>
        <div className="job-detail job-team">{post.categories.team}</div>
      </div>
    </div>

  );
}

class JobPostingApi {
  getPostings(): Promise<JobPosting[]> {
    return Promise.resolve(jobData.map(x => x as JobPosting));
  }
}
//axios.get<JobPosting[]>(jobsUrl)

function App() {
  let [postings, setPostings] = useState([] as JobPosting[]);
  let [cities, setCities] = useState(new Set<string>());
  let [departments, setDepartments] = useState(new Set<string>());
  let [currentCity, setCurrentCity] = useState("Any City");
  let [currentDepartment, setCurrentDepartment] = useState("Any Department");

  useEffect(() => {
    const api = new JobPostingApi();
    api.getPostings().then(x => {
      setPostings(x);
      setCities(new Set(x.map(y => y.categories.location).sort()));
      setDepartments(new Set(x.map(y => y.categories.department).sort()));
    });
  }, []);

  const filterPost = (post: JobPosting): boolean => {
    if (currentCity !== "Any City" && currentCity !== post.categories.location) {
      return false;
    } else if (currentDepartment !== "Any Department" && currentDepartment !== post.categories.department) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <select value={currentCity}
          onChange={e => setCurrentCity(e.target.value)}>
            <option value="Any City">Any City</option>
            {[...cities].map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
        </select>
        <select value={currentDepartment}
          onChange={e => setCurrentDepartment(e.target.value)}>
            <option value="Any Department">Any Department</option>
            {[...departments].map((dep, idx) => (
              <option key={idx} value={dep}>{dep}</option>
            ))}
        </select>
        { postings.filter(filterPost).map((job, idx) => {
          return (<JobPost key={idx} post={job} />);
        }) }
      </header>
    </div>
  );
}

export default App;
