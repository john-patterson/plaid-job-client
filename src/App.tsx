import React from 'react';
import './App.css';
import JobListingPage from './pages/JobListingPage';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <JobListingPage />
        </Route>
        <Route path="/apply">
          <JobListingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
