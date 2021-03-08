import axios, { AxiosResponse } from "axios";

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


export interface IJobApplicationApi {
    apply(application: JobRequest): Promise<AxiosResponse<any>>;
}

export class MockJobApplicationApi implements IJobApplicationApi {
    apply(application: JobRequest): Promise<AxiosResponse<any>> {
        const response: AxiosResponse<any> = {
            data: application,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {}
        };
        return Promise.resolve(response);
    }
}

export class ActualJobApplicationApi implements IJobApplicationApi {
    private readonly applyEndpoint = "https://contact.plaid.com/jobs";
    apply(application: JobRequest): Promise<AxiosResponse<any>> {
        return axios
            .post(this.applyEndpoint, application);
    }
}