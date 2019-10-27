#!/usr/bin/env node

const [ distributionID, operation, inputCNAME ] = process.argv.slice(2);

const { considerExecutability } = require('./lib/consider-executability');
considerExecutability(distributionID, operation, inputCNAME);

const { updateCloudFrontDistributionCNAMES } = require('./lib/update-cloudfront-distribution-cnames');
updateCloudFrontDistributionCNAMES(distributionID, operation, inputCNAME);
