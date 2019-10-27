const REQUIRED_ENVIRONMENT_VARIABLES = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY'
];

const validateEnvironment = () => {
  const missingEVs = REQUIRED_ENVIRONMENT_VARIABLES.filter(ev => !process.env[ev] || process.env[ev] && !process.env[ev].length);

  if (missingEVs.length) {
    const messages = missingEVs.map(ev => `\n${ev} not defined!\n\nPlease set your ${ev}: export ${ev}=YOUR_${ev}`);
    console.log(messages.join('\n'));
    process.exit(1);
  }
};

module.exports = { validateEnvironment };
