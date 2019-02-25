module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: false,
                banner: grunt.file.read('header.txt')
            },
            my_target: {
                files: {
                    'dist/bootbox.min.js': ['src/bootbox.js'],
                    'dist/bootbox.locales.min.js': ['src/bootbox.locales.js'],
                    'dist/bootbox.all.min.js': ['src/bootbox.js', 'src/bootbox.locales.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['src/bootbox.js']
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint', 'karma']);
};  