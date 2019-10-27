const { validateEnvironment } = require('./validations/validate-environment');
const { validateArg }         = require('./validations/validate-arg');
const { validateOperation }   = require('./validations/validate-operation');

const considerExecutability = (distributionID, operation, inputCNAME) => {
  validateEnvironment();
  validateArg(distributionID, 'DISTRIBUTION_ID');
  validateArg(operation, 'OPERATION');
  validateOperation(operation);
  validateArg(inputCNAME, 'CNAME');
};

module.exports = { considerExecutability };
