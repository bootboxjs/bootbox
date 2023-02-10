var baseConfig = require('./karma-base.conf');

module.exports = baseConfig({
  vendor: [
    'tests/vendor/jquery-3.3.1.slim.min.js',
    'tests/vendor/bootstrap-4.6.1.bundle.min.js'
  ],
  src: ['dist/bootbox.js', 'dist/bootbox.locales.js']
});
