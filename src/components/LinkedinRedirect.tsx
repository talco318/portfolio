import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LinkedinRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = 'https://www.linkedin.com/in/your-profile';
  }, []);

  return (
    <div>
      <p>Redirecting to LinkedIn...</p>
    </div>
  );
};

export default LinkedinRedirect;
