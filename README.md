# AWS Pricing Explorer

[![Build Status](https://travis-ci.org/jpdillingham/AWSPricingExplorer.svg?branch=master)](https://travis-ci.org/jpdillingham/AWSPricingExplorer/branches)
![license](https://img.shields.io/github/license/jpdillingham/AWSPricingExplorer.svg)

A microservice for the AWS Pricing Api, written in JavaScript with Express, React, and blueprintjs.

# Running Locally

First, you'll need [nodejs](https://nodejs.org/en/) installed.  Next, you'll need to log in to your AWS account and create a new IAM user (or use an existing one, your call) and add the policy `AWSPriceListServiceFullAccess` to grant access to the pricing api.  Note the access key ID and secret access key, you'll need them to configure the app.

Clone the repository with `git clone https://github.com/jpdillingham/AWSPricingExplorer`, then `cd` into the directory that was created.

Create a file named `.env` with the command `touch .env`, then open the file in a text editor of your choosing.

Add the following lines, replacing the placeholders with your credentials:

```
REACT_APP_ACCESS_KEY_ID=<your access key ID>
REACT_APP_SECRET_ACCESS_KEY=<your secret access key>
```

Optionally you can change the port and hostname used to host the backend and access it by adding the following:

```
REACT_APP_BACKEND_PORT=8080
REACT_APP_ROOT_URL=http://localhost
```

Start the app with `npm start`.  Note that it's set up for development, using the webpack dev server that comes with `create-react-app` and nodemon for the backend.  You'll need to do some extra leg work if you want to deploy the app elsewhere.

