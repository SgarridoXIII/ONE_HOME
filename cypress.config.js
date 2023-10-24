const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
 // projectId: '3wv1gh',
  //projectId: 'rofhvc',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', verifyDownloadTasks);
      on("task", {
        generateOTP: require("cypress-otp")
      });
      
    },
    baseUrl: 'http://one-pre.kube.vged.es/home',
    video: false,
    chromeWebSecurity: false,
    testIsolation: false,
    viewportHeight:900,
    viewportWidth:1500,
    defaultCommandTimeout:15000,
    excludeSpecPattern: [
     // '*/**/3-Pruebas'
    ]
  },
  
});
