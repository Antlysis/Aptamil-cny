interface ErrorType {
  response: {
    data: {
      message: string;
    };
  };
}

export const apiErrorHandling = async <TInput, TOutput>({
  dataCall,
  noDataCall,
  data,
}: {
  dataCall?: (data: TInput) => Promise<TOutput>;
  noDataCall?: () => Promise<TOutput>;
  data?: TInput;
} = {}): Promise<TOutput | undefined> => {
  try {
    if (data && dataCall) {
      const res = await dataCall(data);
      return res;
    } else if (!data && noDataCall) {
      const res = await noDataCall();
      return res;
    }
  } catch (error) {
    const actualError = error as ErrorType;
    const errorMessage =
      actualError?.response?.data?.message ||
      'An error occurred while processing your request.';
    alert(`Error: ${errorMessage}`);
    console.error(error);

    if (error instanceof Error) {
      if (error.stack) console.error('Stack trace:', error.stack);
    } else {
      console.error('An error occurred while processing your request.');
    }
  }
};
