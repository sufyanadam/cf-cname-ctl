const CloudFront = require('aws-sdk/clients/cloudfront');
const cf = new CloudFront({apiVersion: '2019-03-26'});

const updateCloudFrontDistributionCNAMES = (distributionID, operation, inputCNAME) => {
  cf.getDistributionConfig({Id: distributionID}, (error, data) => {
    if (error) {
      console.log(`Error getting configuration for distribution ${distributionID}:\n${error}`);
      process.exit(1);
    }

    let config = data;
    let cnames = data.DistributionConfig.Aliases.Items;
    console.log(`\nCurrent CNAMES:\n\n${cnames.join('\n')}\n`);

    const cnameExists = cnames.includes(inputCNAME);

    if (operation === 'remove') {
      if (!cnameExists) {
        console.log(`\nCNAME entry ${inputCNAME} not found! Nothing to do...`);
        process.exit(0);
      }

      console.log(`Removing CNAME ${inputCNAME}`);
      cnames = cnames.filter(cname => cname != inputCNAME);
    }
    else {
      if (cnameExists) {
        console.log(`\nCNAME entry ${inputCNAME} already exists! Nothing to do...`);
        process.exit(0);
      }

      console.log(`Adding CNAME ${inputCNAME}`);
      cnames.push(inputCNAME);
    }

    console.log(`\nNew CNAME list:\n\n${cnames.join('\n')}`);

    config.DistributionConfig.Aliases.Items = cnames;
    config.DistributionConfig.Aliases.Quantity = cnames.length;

    const { ETag, DistributionConfig } = config;

    console.log(`\nNew distribution config to be submitted:\n\b${JSON.stringify(DistributionConfig, null, 2)}`);

    cf.updateDistribution({
      DistributionConfig: DistributionConfig,
      Id: distributionID,
      IfMatch: ETag
    }, (error, data) => {
      if (error) {
        console.log(`There was an error updating the distribution ${distributionID}:\n\n${error}\n${error.stack}`);
      }
      else {
        console.log(`Successfully updated distribution ${distributionID}. CloudFront response:\n${JSON.stringify(data, null, 2)}`);
      }
    });
  });
};

module.exports = { updateCloudFrontDistributionCNAMES };
