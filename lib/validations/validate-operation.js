const SUPPORTED_OPERATIONS = ['add', 'remove'];

const validateOperation = operation => {
  if (!SUPPORTED_OPERATIONS.includes(operation)) {
    console.log(`\nUnsupported operation type: ${operation}\n\nSupported Operations: add, remove`);
    process.exit(1);
  }
};

module.exports = { validateOperation };
