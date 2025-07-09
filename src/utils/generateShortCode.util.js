const URL = require('../models/URL.model');

let nanoidGenerator

const generateUniqueCode = async () => {

  // generator is created only once
  if (!nanoidGenerator) {
    // Importing the package only at runtime
    const { customAlphabet } = await import('nanoid');
    nanoidGenerator = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);
    console.log("creating nanoidGenerator")
  }

  let code;
  let exists;
  do {
    code = nanoidGenerator();
    exists = await URL.findOne({ shortCode: code });
  } while (exists);
  return code;
};

module.exports = {
  generateUniqueCode
};
