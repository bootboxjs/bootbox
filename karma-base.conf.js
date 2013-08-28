module.exports = function(params) {

  "use strict";

  console.log("Vendor files: " + params.vendor.join(", "));

  return function(config) {

    return config.set({
      basePath: "",
      frameworks: ["mocha", "chai"],
      files: Array.prototype.concat([
        "node_modules/sinon/lib/sinon.js",
        "node_modules/sinon/lib/sinon/spy.js",
        "node_modules/sinon/lib/sinon/stub.js",
        "node_modules/sinon-chai/lib/sinon-chai.js"],

        params.vendor,

        params.src || "bootbox.js",

        ["tests/**/*.test.coffee",
        "tests/**/*.test.js"]
      ),
      exclude: [],
      preprocessors: {
        "**/*.coffee": ["coffee"],
        "bootbox.js": ["coverage"]
      },
      reporters: ["dots", "coverage", "junit"],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ["PhantomJS"],
      captureTimeout: 60000,
      singleRun: true,

      coverageReporter: {
        type: "cobertura",
        dir: "tests/coverage"
      },

      junitReporter: {
        outputFile: "tests/reports/results.xml"
      }
    });

  };

};
