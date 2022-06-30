type Error = {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
};

export const setError = (error: Error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  return message;
};
