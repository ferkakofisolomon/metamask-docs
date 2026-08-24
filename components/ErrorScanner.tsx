import React from 'react';

interface ErrorScannerProps {
  errors: string[];
  onRetry: () => void;
}

const ErrorScanner: React.FC<ErrorScannerProps> = ({ errors, onRetry }) => {
  return (
    <div className="error-scanner">
      <h2>Error Scanner</h2>
      {errors.length > 0 ? (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : (
        <p>No errors found.</p>
      )}
      <button onClick={onRetry}>Retry Review</button>
    </div>
  );
};

export default ErrorScanner;