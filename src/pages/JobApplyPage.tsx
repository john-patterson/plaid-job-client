import React, { ReactElement, useState } from 'react';
import { JobPosting } from '../sdk/JobPostingApi';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import './JobApplyPage.css';
import { Redirect } from 'react-router';
import TextInput from '../components/TextInput';
import { JobRequest } from '../sdk/JobApplyApi';

export interface IJobApplyPageProps {
  post: JobPosting;
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

 
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = (): void => {
    console.log(JSON.stringify(createFormObject()));
    setRedirect(true);
  };

  if (redirect) {
    return (<Redirect to="/success" />);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="job-application">
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

        <input className="form-submit" type="submit" value="Submit" />
      </div>
    </form>
  );
}

const parse = (input: string): React.ReactElement[] => {
  const transformFn = (node: Node, index: number): ReactElement | void | null => {
    const dangerousNode = node as any;
    if (dangerousNode && dangerousNode.attribs && dangerousNode.attribs.style) {
      dangerousNode.attribs.style = "";
    }
    return convertNodeToElement(node, index, transformFn);
  };
  return ReactHtmlParser(input, {
    transform: transformFn
  });
};

export default function JobApplyPage(props: IJobApplyPageProps): JSX.Element {
  return (
    <div className="job-application-page">
      <div className="job-application-container">
        <h1>{props.post.text}</h1>
        <div className="job-classification">
          <h2>Classification</h2>
          <div className="blurb-body job-categories">
            <label>Location</label>
            <span>{props.post.categories.location}</span>
            <label>Department</label>
            <span>{props.post.categories.department}</span>
            <label>Team</label>
            <span>{props.post.categories.team}</span>
            <label>Commitment</label>
            <span>{props.post.categories.commitment}</span>
          </div>
        </div>
        <div className="job-inclusion-statement">
          <h2>Mission Statement</h2>
          <div className="blurb-body">
            {parse(props.post.additional)}
          </div>
        </div>
        <div className="job-description">
          <h2>Description</h2>
          <div className="blurb-body">
            {parse(props.post.description)}
          </div>
        </div>
        <div className="job-requirements">
          <h2>Role Requirements</h2>
          <div className="blurb-body">
            { props.post.lists.map((ls, idx) => {
              return (
                <div key={idx}>
                  <h3>{ls.text}</h3>
                  <div>
                    {parse(ls.content)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="job-app-form">
          <h2>Join Us</h2>
          <div className="blurb-body">
          <JobApplicationForm post={props.post} />
          </div>
        </div>
      </div>
    </div>
  );
}
