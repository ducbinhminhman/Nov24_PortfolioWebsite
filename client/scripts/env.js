// This file is required to make dotenv work with CommonJS scripts
require('dotenv').config();

module.exports = {
  // Make environment variables available
  env: {
    REACT_APP_SANITY_PROJECT_ID: process.env.REACT_APP_SANITY_PROJECT_ID,
    REACT_APP_SANITY_DATASET: process.env.REACT_APP_SANITY_DATASET,
    REACT_APP_SANITY_API_VERSION: process.env.REACT_APP_SANITY_API_VERSION,
  },
};
