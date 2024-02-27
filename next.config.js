// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // Your existing module.exports
  env: {
    API_HOST: process.env.API_HOST,
    WS_HOST: process.env.WS_HOST,
    SENTRY_DSN: process.env.SENTRY_DSN,
    PRIVACY_POLICY_URL_PL: process.env.PRIVACY_POLICY_URL_PL,
    TERMS_AND_CONDITIONS_URL_PL: process.env.TERMS_AND_CONDITIONS_URL_PL,
    SUPPORT_EMAIL_ADDRESS: process.env.SUPPORT_EMAIL_ADDRESS,
    PUBLIC_URL: process.env.PUBLIC_URL,
    AWS_PUBLIC_BUCKET_URL: process.env.AWS_PUBLIC_BUCKET_URL,
    REACT_APP_FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_OAUTH2_KEY: process.env.GOOGLE_OAUTH2_KEY
  },
  webpack: (config, { defaultLoaders }) => {
    defaultLoaders.babel.options.plugins = [
      require.resolve('@emotion/babel-plugin')
    ];
    return config;
  },
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000'
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/:slug/privacy-policy',
        destination:
          process.env.AWS_PUBLIC_BUCKET_URL + '/files/privacy-policy.pdf' ||
          'https://youexpert-production-backend-public-bucket.s3.eu-west-1.amazonaws.com/files/privacy-policy.pdf',
        permanent: true
      },
      {
        source: '/:slug/terms-and-conditions',
        destination:
          process.env.AWS_PUBLIC_BUCKET_URL + '/files/regulamin.pdf' ||
          'https://youexpert-production-backend-public-bucket.s3.eu-west-1.amazonaws.com/files/terms-and-conditions.pdf',
        permanent: true
      },
      {
        source: '/:slug/contacts',
        destination: 'https://blog.youexpert.pl/kontakt/kontakt.html',
        permanent: true
      },
      {
        source: '/:slug/kontakt',
        destination: 'https://blog.youexpert.pl/kontakt/kontakt.html',
        permanent: true
      },
      {
        source: '/listatowarowiuslugzabronionych',
        destination:
          'https://youexpert-production-backend-public-bucket.s3.eu-west-1.amazonaws.com/files/Listatowarowiusługzabronionych.pdf',
        permanent: true
      },
      {
        source: '/zasadykatalog',
        destination:
          'https://youexpert-production-backend-public-bucket.s3.eu-west-1.amazonaws.com/files/zasadykatalog.pdf',
        permanent: true
      },
      {
        source: '/cennik',
        destination:
          'https://youexpert-production-backend-public-bucket.s3.eu-west-1.amazonaws.com/files/Cennik.pdf',
        permanent: true
      }
    ];
  }
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
//module.exports = moduleExports;
module.exports =
  process.env.SENTRY_DSN && process.env.API_HOST
    ? withSentryConfig(moduleExports, SentryWebpackPluginOptions)
    : moduleExports;
