module.exports = function(grunt) {
  
      var compileType = function() {
              var type = this.data.type;
              var template = grunt.file.read('templates/types.js');
              var anon = grunt.file.read('templates/anon.js');
              var files =  grunt.file.expand([
                  'src/' + type + '/*.js'
              ]);
              var regexp = /\}\(this, function \(bootbox\) \{\s([\s\S]+)(?:\s\}\)\);)/;
              var content = '';
              var file;
              var i;
  
              for (i = 0; i < files.length; i++) {
                  file = grunt.file.read(files[i]);
  
                  content += '\n' + grunt.template.process(anon, {
                      data: {
                          content: file.match(regexp)[1]
                      }
                  }) + '\n';
              }
  
              grunt.file.write('temp/' + type + '.js', content);
  
              if (type === 'locales') {
                  grunt.file.write('locales.js', grunt.template.process(template, {
                      data: {
                          type: type,
                          content: content
                      }
                  }));
              }
          }
  
      require('load-grunt-tasks')(grunt);
  
      grunt.initConfig({
          copy: {
              locales: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/',
                          src: [
                              'locales/*.js'
                          ],
                          dest: './'
                      }
                  ]
              }
          },
          compile: {
              locales: {
                  type: 'locales'
              }
          },
          uglify: {
              min: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/',
                          src: [
                              'locales/*.js'
                          ],
                          dest: 'min/',
                          ext: '.min.js'
                      },
                      {
                          expand: true,
                          src: [
                              'bootbox.js',
                              'locales.js'
                          ],
                          dest: 'min/',
                          ext: '.min.js'
                      }
                  ]
              },
              options: {
                  preserveComments: 'some'
              }
          },
          jshint: {
              all: [
                  'Gruntfile.js',
                  'src/**/*.js'
              ],
              options: {
                  'node': true,
                  'browser': true,
                  'curly': true,
                  'devel': false,
                  'eqeqeq': true,
                  'eqnull': true,
                  'newcap': true,
                  'noarg': true,
                  'undef': true,
                  'sub': true,
                  'strict': false,
                  'quotmark': 'single',
                  'globals': {
                      'define': true
                  }
              }
          }
      });
  
      grunt.registerTask('default', [
          'test'
      ]);
  
      grunt.registerMultiTask('compile', compileType);
  
      grunt.registerTask('build', [
          'jshint',
          'compile',
          'compile:bootbox',
          'copy'
      ]);
  
      grunt.registerTask('test', [
          'build'
      ]);
  
      grunt.registerTask('test:npm', [
          'build'
      ]);
  
      grunt.registerTask('test:browser', [
          'build'
      ]);
  
      grunt.registerTask('dist', [
          'build',
          'uglify'
      ]);
  
      grunt.registerTask('version', function (version) {
          if (!version || version.split('.').length !== 3) {
              grunt.fail.fatal('malformed version. Use\n\n    grunt version:1.2.3');
          }
  
          grunt.config('string-replace.json', {
              files: {
                  'package.json': 'package.json',
                  'component.json': 'component.json',
                  'bower.json': 'bower.json'
              },
              options: {
                  replacements: [
                      {
                          pattern: /"version": .*/,
                          replacement: '"version": "' + version + '",'
                      }
                  ]
              }
          });
  
          grunt.config('string-replace.bootbox', {
              files: {
                  'src/bootbox.js': 'src/bootbox.js'
              },
              options: {
                  replacements: [
                      {
                          pattern: /version : .*/,
                          replacement: 'version : ' + version
                      },
                      {
                          pattern: /VERSION = .*/,
                          replacement: 'VERSION = \'' + version + '\','
                      }
                  ]
              }
          });
  
          grunt.config('string-replace.templates', {
              files: {
                  'templates/types.js': 'templates/types.js'
              },
              options: {
                  replacements: [
                      {
                          pattern: /: .*/,
                          replacement: ': ' + version
                      }
                  ]
              }
          });
  
          grunt.task.run([
              'string-replace:json',
              'string-replace:templates',
              'string-replace:bootbox'
          ]);
      });
  
      // Travis CI task.
      grunt.registerTask('travis', [
          'build'
      ]);
  };
  