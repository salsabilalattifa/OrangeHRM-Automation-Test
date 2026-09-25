const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl : 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    urlAPI : 'https://api.escuelajs.co/api/v1',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
