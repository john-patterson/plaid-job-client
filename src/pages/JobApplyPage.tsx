import React from 'react';
import { JobPosting } from '../sdk/JobPostingApi';

import './JobApplyPage.css';

export interface IJobApplyPageProps {
  post: JobPosting;
}

export default function JobApplyPage(props: IJobApplyPageProps): JSX.Element {
  return (
    <div>
      <h1>{props.post.text}</h1>
      <p>{props.post.additional}</p>
    </div>
  );
}
