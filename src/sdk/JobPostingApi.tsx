import jobData from './job-data.json';

// const jobsUrl = "https://api.lever.co/v0/postings/plaid?mode=json"
export interface JobPosting {
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

export interface JobCategory {
    commitment: string;
    department: string;
    location: string;
    team: string;
}

export interface JobRequirements {
    content: string;
    text: string;
}

export default class JobPostingApi {
  getPostings(): Promise<JobPosting[]> {
    return Promise.resolve(jobData.map(x => x as JobPosting));
  }
}
