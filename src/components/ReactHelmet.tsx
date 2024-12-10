import { Helmet } from 'react-helmet';

const ReactHelmet = () => {
  const driveApiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_APP_DRIVE_API
      : import.meta.env.VITE_APP_DRIVE_API_SB;

  return (
    <Helmet>
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta
        httpEquiv="Content-Security-Policy"
        content={`
          default-src 'self' ${driveApiUrl};
          script-src 'self';
          style-src 'self';
          img-src 'self' data:;
          font-src 'self';
          connect-src 'self' ${driveApiUrl};
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
