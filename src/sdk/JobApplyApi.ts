
export interface JobRequest {
    name: string;
    email: string;
    resume: string;
    phone: string;
    job_id: string;

    // Optional attributes
    github?: string;
    twitter?: string;
    website?: string;
    location?: string;
    favorite_candy?: string;
    superpower?: string;
}