/*
 * grunt-tex-hunspell
 * https://github.com/grunt-tex/grunt-tex-hunspell
 *
 * Copyright (c) 2015 Oliver Woodings
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js",
        "<%= mochaTest.test.src %>"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Configuration to be run (and then tested).
    hunspell: {
      succeed: "test/fixtures/succeed.tex",
      warn: "test/fixtures/warn.tex"
    },

    // Unit tests.
    mochaTest: {
      test: {
        options: {
          reporter: "spec"
        },
        src: ["test/test.js"]
      }
    }

  });

  // Actually load this plugins task(s).
  grunt.loadTasks("tasks");

  // Load NPM tasks
  require("load-grunt-tasks")(grunt);

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask("test", ["mochaTest"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};