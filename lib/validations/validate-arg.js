const USAGE_MSG = `
Usage:

cf-cname-ctl DISTRIBUTION_ID OPERATION CNAME

Where DISTRIBUTION_ID is the cloudfront distribution id to update,
OPERATION is one of [add remove] and CNAME is the CNAME to act with.

Example:

To remove the CNAME app.example.com from the CloudFront distribution with ID S9H3LE11AJ4QAG:
cf-cname-ctl S9H3LE11AJ4QAG remove some-cname.example.com

To add the CNAME app.example.com from the CloudFront distribution with ID S9H3LE11AJ4QAG:
cf-cname-ctl S9H3LE11AJ4QAG add
`;

const validateArg = (arg, displayName) => {
  if (!arg || arg && !arg.length) {
    console.log(`\n${displayName} is required!\n${USAGE_MSG}`);
    process.exit(1);
  }
};

module.exports = { validateArg };
