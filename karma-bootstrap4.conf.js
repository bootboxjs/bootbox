var baseConfig = require("./karma-base.conf");

module.exports = baseConfig({
  vendor: [
    "tests/vendor/jquery-3.3.1.min.js",
    "tests/vendor/bootstrap-4.0.0.min.js"
  ]
});
