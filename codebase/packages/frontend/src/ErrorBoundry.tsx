import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("ErrorBoundary caught an error", event.error);
      setHasError(true);
      navigate('/500');
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [navigate]);

  if (hasError) {
    // Return null to prevent rendering the fallback UI
    return null;
  }

  return children;
};

export default ErrorBoundary;
