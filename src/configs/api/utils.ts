export const getRemoteURL = () => {
  const REMOTE_URL = import.meta.env.VITE_API_DOMAIN_URL;
  return REMOTE_URL;
};

export const getEndpoint = (route: string) => {
  const endpoint = `${getRemoteURL()}${route}`;
  return {
    apiURL: endpoint,
    apiHeaders: {},
  };
};
