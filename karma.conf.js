var baseConfig = require("./karma-base.conf");

module.exports = baseConfig({
  vendor: [
    "tests/vendor/jquery-1.8.3.min.js",
    "tests/vendor/bootstrap-3.0.0.min.js"
  ]
});
