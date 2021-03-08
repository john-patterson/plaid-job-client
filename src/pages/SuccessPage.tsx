import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

import './SuccessPage.css';

export function SuccessPage() {
  const [seconds, setSeconds] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const update = () => setSeconds(seconds - 1);
    const interval = setInterval(update, 1000);

    return () => {
      if (seconds <= 0 || redirect) {
        clearInterval(interval);
        setRedirect(true);
      }
    };
  }, [redirect, seconds, setSeconds]);

  if (redirect) {
    return (<Redirect to="/" />);
  }

  return (
    <div className="page-container">
      <div className="success-box">
        Success! Redirecting in <span>{seconds}</span> seconds.
      </div>
    </div>
  );
}
