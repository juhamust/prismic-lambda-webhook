# Prismic.io Lambda Webhook

This repository contains the [AWS Lambda](https://aws.amazon.com/lambda/) based handler for [Prismic.io](https://prismic.io/) webhooks that are run whenever the content is changed in Prismic. Handy for building/publishing content using AWS Services.

## Usage

Sequence in short:

1. User changes content in Prismic.io service
2. Prismic triggers the webhook into address defined in settings.
3. Webhook is handled (and authorized) by simple AWS Lambda based endpoint
4. Lambda triggers SNS message with topic: `PRISMIC_LAMBDA_WEBHOOK`
5. Another service/lambda/whatever in AWS is triggered by the SNS


## License

MIT License