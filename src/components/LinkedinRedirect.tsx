import { useEffect } from 'react';

const LinkedinRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://www.linkedin.com/in/talco318/';
  }, []);

  return <p>Redirecting to LinkedIn...</p>;
};

export default LinkedinRedirect;
