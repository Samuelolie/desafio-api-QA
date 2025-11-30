const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    env: {
      baseUrl: process.env.BASE_URL,
    },
  },
});
