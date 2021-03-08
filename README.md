# Plaid Jobs

When applying to Plaid, applicants must apply by issuing a POST request to an API endpoint. This static site wraps the APIs that drive the Plaid career portal and makes it easier to apply from the browser.

Currently, the site is deployed as a GitHub pages static site, hosted at:

http://www.johnppatterson.com/plaid-job-client/#/

## Developing

Running `yarn start` will start a hot-reloading development server.
Currently the only way to set development mode is by modifying `developmentMode` in `App.tsx`. Development mode mocks out both the job listings API, stopping you from accidentally throttling yourself on lever's API, as well as the Plaid careers API, so you don't accidentally get a call from a recruiter.

## Deploying

Running `yarn deploy` will deploy the site to GitHub pages.

Be sure to set `developmentMode` in `App.tsx` to `false` so that production systems are used.