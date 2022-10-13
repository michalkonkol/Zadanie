const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'https://qa-test.mrx.gd',

    setupNodeEvents(on, config) {

    },
  },
});
