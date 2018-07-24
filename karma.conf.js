var baseConfig = require('./karma-base.conf');

module.exports = baseConfig({
  vendor: [
    'tests/vendor/jquery-3.3.1.slim.min.js',
    'tests/vendor/bootstrap-4.0.0.bundle.min.js'
  ],
  src: ['src/bootbox.js', 'src/bootbox.locales.js']
});
