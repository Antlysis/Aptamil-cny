import { Helmet } from 'react-helmet';

const ReactHelmet = () => {
  const driveApiUrl = import.meta.env.VITE_API_DOMAIN_URL;

  return (
    <Helmet>
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta
        httpEquiv="Content-Security-Policy"
        content={`
          default-src 'self' ${driveApiUrl};
          script-src 'self' 'unsafe-inline';
          style-src 'self';
          img-src 'self' data: blob: *;
          font-src 'self';
          connect-src 'self' ${driveApiUrl} https://cdn.simplelocalize.io;
          frame-ancestors 'none';
        `}
      />
      <meta
        httpEquiv="Strict-Transport-Security"
        content="max-age=63072000; includeSubDomains; preload"
      />
      <meta name="referrer" content="no-referrer" />
      <meta
        httpEquiv="Permissions-Policy"
        content="geolocation=(), microphone=(), camera=(), payment=()"
      />
    </Helmet>
  );
};

export default ReactHelmet;
