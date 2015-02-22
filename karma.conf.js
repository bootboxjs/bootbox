var baseConfig = require("./karma-base.conf");

module.exports = baseConfig({
  vendor: [
    "tests/vendor/jquery-1.11.2.min.js",
    "tests/vendor/bootstrap-3.3.2.min.js"
  ]
});
