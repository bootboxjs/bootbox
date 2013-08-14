module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        banner: grunt.file.read("header.txt")
      },
      build: {
        files: {
          "bootbox.min.js": ["bootbox.js"]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["bootbox.js"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
};
