import React, { useState } from 'react';
import { JobPosting } from '../sdk/JobPostingApi';
import ReactHtmlParser from 'react-html-parser';

import './JobApplyPage.css';
import { useHistory } from 'react-router';

export interface IJobApplyPageProps {
  post: JobPosting;
}


interface JobRequest {
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


type InputType = "text" | "email" | "url" | "tel";

interface ITextInputProps {
  label: string;
  onChanged: (value: string) => void;
  required?: boolean;
  initialValue?: string;
  type?: InputType;
}

function TextInput(props: ITextInputProps): JSX.Element {
  const [currentValue, setCurrentValue] = useState(props.initialValue ?? "");

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    props.onChanged(value);
    setCurrentValue(value);
  };

  return (
    <>
      <label className={props.required ? "required" : ""}>
        {props.label}
      </label>
      <input type={props.type ?? "text"} onChange={updateValue} value={currentValue} />
    </>
  );
}

function JobApplicationForm(props: IJobApplyPageProps): JSX.Element {
  const jobId = props.post.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [phone, setPhone] = useState("");

  const [github, setGithub] = useState<string | undefined>(undefined);
  const [twitter, setTwitter] = useState<string | undefined>(undefined);
  const [website, setWebsite] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [favoriteCandy, setFavoriteCandy] = useState<string | undefined>(undefined);
  const [superpower, setSuperpower] = useState<string | undefined>(undefined);

  const createFormObject = (): JobRequest => ({
    job_id: jobId,
    name,
    email,
    resume: resumeUrl,
    phone,
    github,
    twitter,
    website,
    location,
    favorite_candy: favoriteCandy,
    superpower
  });

  const history = useHistory();
  
  const handleSubmit = (): void => {
    console.log(JSON.stringify(createFormObject()));
    history.push('/');
  };

  return (
    <form className="job-application" onSubmit={handleSubmit}>
      <div className="form-data">
        <TextInput label="Name" onChanged={setName} required={true} />
        <TextInput label="Email" onChanged={setEmail} required={true} type="email" />
        <TextInput label="Resume URL" onChanged={setResumeUrl} required={true} type="url" />
        <TextInput label="Phone" onChanged={setPhone} required={true} type="tel" />

        <TextInput label="Github" onChanged={setGithub} type="url" />
        <TextInput label="Twitter" onChanged={setTwitter} type="url" />
        <TextInput label="Website" onChanged={setWebsite} type="url" />
        <TextInput label="Location" onChanged={setLocation} type="text" />
        <TextInput label="Favorite Candy" onChanged={setFavoriteCandy} type="text" />
        <TextInput label="Superpower" onChanged={setSuperpower} type="text" />
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default function JobApplyPage(props: IJobApplyPageProps): JSX.Element {
  return (
    <div>
      <h1>{props.post.text} ({props.post.categories.commitment})</h1>
      <div>{ReactHtmlParser(props.post.additional)}</div>
      <h2>Classification</h2>
      <div className="job-categories">
        <div>Location: {props.post.categories.location}</div>
        <div>Department: {props.post.categories.department}</div>
        <div>Team: {props.post.categories.team}</div>
      </div>
      <h2>Description</h2>
      <div className="job-description">
        {ReactHtmlParser(props.post.description)}
      </div>
      <h2>Role Requirements</h2>
      <div className="job-requirements">
        { props.post.lists.map((ls, idx) => {
          return (
            <div key={idx}>
              <h3>{ls.text}</h3>
              <div>
                {ReactHtmlParser(ls.content)}
              </div>
            </div>
          );
        })}
      </div>
      <h2>Join Us</h2>
      <JobApplicationForm post={props.post} />
    </div>
  );
}
