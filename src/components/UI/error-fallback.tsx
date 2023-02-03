type Props = {
  error: any | unknown;
  resetErrorBoundary: any;
};

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div className='error'>
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
export default ErrorFallback;
