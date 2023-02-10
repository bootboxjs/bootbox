module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        concat: {
            copy : {
                src: ['bootbox.js'],
                dest: 'dist/bootbox.js'
            },

            locales: {
                src: ['templates/umd-header-locales.txt', 'locales/**/*.js', 'templates/umd-footer.txt'],
                dest: 'dist/bootbox.locales.js'
            },

            all : {
                src: ['bootbox.js', 'dist/bootbox.locales.js'],
                dest: 'dist/bootbox.all.js'
            }
        },

        jsbeautifier : {
            src : ['dist/bootbox.locales.js','dist/bootbox.all.js'],
            options:{
                js: {
                    indentSize: 2
                }
            }
        },
          
        uglify: {
            options: {
                compress: true,
                mangle: true,
                banner: grunt.file.read('header.txt'),
                output:{
                    quote_style: 3
                }
            },
            my_target: {
                files: {
                    'dist/bootbox.min.js': ['dist/bootbox.js'],
                    'dist/bootbox.locales.min.js': ['dist/bootbox.locales.js'],
                    'dist/bootbox.all.min.js': ['dist/bootbox.all.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true
            },
            all: ['dist/bootbox.js', 'dist/bootbox.locales.js']
        },

        karma: {
            current: {
                configFile: 'karma.conf.js'
            },
            legacy: {
                configFile: 'karma.conf.legacy.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['concat', 'jsbeautifier', 'uglify', 'jshint', 'karma']);
};  