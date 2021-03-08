import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import jobData from './job-data.json';
import FilterBox from './FilterBox';

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

export interface IFilterBoxProps {
  options: string[];
  onChanged: (value: string) => void;
  default?: string;
  unfilteredValue?: string;
}

function App() {
  const unfilteredCity = "Any City";
  const unfilteredDepartment = "Any Department";
  let [postings, setPostings] = useState([] as JobPosting[]);
  let [cities, setCities] = useState(new Set<string>());
  let [departments, setDepartments] = useState(new Set<string>());
  let [currentCity, setCurrentCity] = useState(unfilteredCity);
  let [currentDepartment, setCurrentDepartment] = useState(unfilteredDepartment);

  const getCities = (postings: JobPosting[]): Set<string> => {
    const rawLocations = postings
      .map(post => post.categories.location)
      .sort();
    return new Set(rawLocations);
  };

  const getDepartments = (postings: JobPosting[]): Set<string> => {
    const rawDepts = postings
      .map(post => post.categories.department)
      .sort();
    return new Set(rawDepts);
  };

  useEffect(() => {
    const api = new JobPostingApi();
    api.getPostings().then(x => {
      const postings = x.map(job => {
        if (!job.categories.department) {
          job.categories.department = "[None]";
        }

        return job;
      });

      setPostings(postings);
      setCities(getCities(postings));
      setDepartments(getDepartments(postings));
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
        <div className="filter-row">
          <FilterBox options={[...cities]}
            onChanged={setCurrentCity}
            default={unfilteredCity}
            unfilteredValue={unfilteredCity} />
          <FilterBox options={[...departments]}
            onChanged={setCurrentDepartment}
            default={unfilteredDepartment}
            unfilteredValue={unfilteredDepartment} />
        </div>
        <div className="post-container">
          { postings.filter(filterPost).map((job, idx) => {
            return (<JobPost key={idx} post={job} />);
          }) }
        </div>
      </header>
    </div>
  );
}

export default App;
