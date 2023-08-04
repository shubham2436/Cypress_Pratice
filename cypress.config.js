

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'nuxt',
      bundler: 'webpack',
    },
  },
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',   // for html report 
  e2e: {
    

    setupNodeEvents(on, config) {
      screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on); // for html report
      // implement node event listeners here
    },
    testIsolation: false,
  },
});
