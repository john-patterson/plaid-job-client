import React, { useEffect, useState } from 'react';
import './App.css';
import JobListingPage from './pages/JobListingPage';
import {
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import { ActualJobPostingApi, IJobPostingApi, JobPosting, MockJobPostingApi } from './sdk/JobPostingApi';
import JobApplyPage from './pages/JobApplyPage';
import { SuccessPage } from './pages/SuccessPage';
import { ActualJobApplicationApi, IJobApplicationApi, MockJobApplicationApi } from './sdk/JobApplyApi';

// Set this to true for development.
const developmentMode = true;

const getJobPostingApi = (): IJobPostingApi => {
  if (developmentMode) {
    // If you use actual data during production you can easily hit lever's API throttling.
    return new MockJobPostingApi();
  } else {
    return new ActualJobPostingApi();
  }
};

const getJobApplicationApi = (): IJobApplicationApi => {
  if (developmentMode) {
    // Unless you want to accidentally apply to a prospective employer, mock this.
    return new MockJobApplicationApi();
  } else {
    return new ActualJobApplicationApi();
  }
};

function App() {
  let [postings, setPostings] = useState([] as JobPosting[]);

  useEffect(() => {
    const api = getJobPostingApi();
    api.getPostings().then(data => {
      setPostings(data);
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <JobListingPage postings={postings} />
        </Route>
        <Route exact path="/success">
          <SuccessPage />
        </Route>
        <Route exact path="/apply/:id" render={(props) => {
            const post = postings.find(p => p.id === props.match.params.id);
            if (post) {
              return (<JobApplyPage post={post} applyApi={getJobApplicationApi()} />);
            } else {
              return <div>Error! Job {props.match.params.id} not found.</div>;
            }
          }} />
      </Switch>
    </Router>
  );
}

export default App;
