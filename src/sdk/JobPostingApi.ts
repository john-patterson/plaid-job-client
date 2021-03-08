import axios, { AxiosResponse } from 'axios';
import jobData from './job-data.json';

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
export interface IJobPostingApi {
  getPostings(): Promise<JobPosting[]>;
}

const cleanPostings = (postings: JobPosting[]): JobPosting[] => {
  return postings.map(post => {
    if (!post.categories.department) {
      return {...post, categories: {...post.categories, department: "[None]"}};
    } else {
      return post;
    }
  });
};

export class ActualJobPostingApi implements IJobPostingApi {
  private readonly jobsUrl = "https://api.lever.co/v0/postings/plaid?mode=json";

  getPostings(): Promise<JobPosting[]> {
    return axios.get(this.jobsUrl)
      .then((response: AxiosResponse<JobPosting[]>) => {
        return cleanPostings(response.data);
      });
  }
}

export class MockJobPostingApi implements IJobPostingApi {
  getPostings(): Promise<JobPosting[]> {
    return Promise.resolve(jobData.map(x => x as JobPosting))
      .then(cleanPostings);
  }
}
