import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

export function SuccessPage() {
  const [seconds, setSeconds] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const update = () => setSeconds(seconds - 1);
    const interval = setInterval(update, 1000);

    return () => {
      if (seconds <= 0) {
        clearInterval(interval);
        setRedirect(true);
      }
    };
  }, [seconds, setSeconds]);

  if (redirect) {
    return (<Redirect to="/" />);
  }

  return (
    <div>
      Success! Redirecting in {seconds} seconds.
    </div>
  );
}
