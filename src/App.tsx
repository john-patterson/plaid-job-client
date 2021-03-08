import React, { useEffect, useState } from 'react';
import './App.css';
import JobListingPage from './pages/JobListingPage';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import JobPostingApi, { JobPosting } from './sdk/JobPostingApi';
import JobApplyPage from './pages/JobApplyPage';

function App() {
  let [postings, setPostings] = useState([] as JobPosting[]);

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
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <JobListingPage postings={postings} />
        </Route>
        <Route exact path="/apply/:id" render={(props) => {
            const post = postings.find(p => p.id === props.match.params.id);
            if (post) {
              return (<JobApplyPage post={post} />);
            } else {
              return <div>Error! Job {props.match.params.id} not found.</div>;
            }
          }} />
      </Switch>
    </Router>
  );
}

export default App;
