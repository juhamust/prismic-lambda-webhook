# Prismic.io Lambda Webhook

This repository contains the [AWS Lambda](https://aws.amazon.com/lambda/) based handler for [Prismic.io](https://prismic.io/) webhooks that are run whenever the content is changed in Prismic. Handy for building/publishing content using AWS Services.

[![Build Status](https://travis-ci.org/juhamust/prismic-lambda-webhook.svg?branch=master)](https://travis-ci.org/juhamust/prismic-lambda-webhook)

## Setup

- Install [Node 6.10](https://nodejs.org/en/) (usage of NVM or n highly suggested!)
- Install [Serverless](https://serverless.com/) 1.12: `npm i -g serverless@1.12` (likely to work with newer versions, too)
- Clone this repo: `git clone https://github.com/juhamust/prismic-lambda-webhook.git`
- Install dependencies: `cd prismic-lambda-webhook && npm install -D`
- Run the tests (optional): `npm test`
- Set valid values in `env.yml` (or create copy like `local.yml` and use --env=local while running commands). **NOTE:** API token is only needed if you want to use the actual sns -based handler example
  ```yml
  PRISMIC_API_ENDPOINT: https://my-repo.prismic.io/api
  PRISMIC_API_TOKEN: see-prismic-api-settings
  PRISMIC_WEBHOOK_SECRET: my-secret
  ```
- Deploy the service: `sls deploy --profile=myawsprofile` ![aws webhook endpoint](https://github.com/juhamust/prismic-lambda-webhook/raw/master/aws-webhook.png "AWS webhook endpoint")
- Copy the generated endpoint and your `PRISMIC_WEBHOOK_SECRET` and place them into Prismic.io Webhook settings ![prismic webhook endpoint](https://github.com/juhamust/prismic-lambda-webhook/raw/master/prismic-webhook.png "Prismic.io webhook endpoint")
- Tryout the trigger: It should be successfull. Check also AWS CloudWatch logs.


## Usage

Sequence in short:

1. User changes content in Prismic.io service
2. Prismic triggers the webhook into address defined in settings.
3. Webhook is handled (and authorized) by simple AWS Lambda based endpoint
4. Lambda triggers SNS message with topic: `PRISMIC_LAMBDA_WEBHOOK`
5. Another service/lambda/whatever in AWS is triggered by the SNS (see `serverless.yml` and `build.js` for example)

## Changelog

#### 0.2.0

- Added Prismic.io build example
- Improved Serverless settings/options

#### 0.1.0

- Initial release

## License

MIT License