/*
 * grunt-tex-hunspell
 * https://github.com/grunt-tex/grunt-tex-hunspell
 *
 * Copyright (c) 2015 Oliver Woodings
 * Licensed under the MIT license.
 */

var when = require("when");
var lift = require("when/node").lift;
var exec = lift(require("exec"));
var _    = require("lodash-node");
var path = require("path");
var pad  = require("pad");

require("colors");

module.exports = function(grunt) {

  grunt.registerMultiTask("hunspell", "Grunt hunspell task", function() {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      executable: "hunspell"
    });

    // Collate arguments for hunspell
    var defaultArgs = {
      "-t": null,
      "-a": null
    };
    var argsObj = _.extend(defaultArgs, options.args);
    var args = [options.executable];
    _.each(argsObj, function (value, key) {
      if (value !== null) {
        if (key.substr(0, 2) === "--") {
          args.push(key + "=" + value);
        } else {
          args.push(key);
          args.push(value);
        }
      } else {
        args.push(key);
      }
    });

    // Iterate over all specified files, executing hunspell on them
    var promises = this.filesSrc
      .filter(function (file) {
        return file.indexOf("node_modules") === -1;
      }).map(function (file) {
      return exec([].concat([], args, [file]))
        .spread(function (out, code) {
          // Return results as an object
          return {
            file: file,
            out: out,
            code: code
          };
        });
      });

    // When all files have been processed, indicate task has finished
    when.all(promises).then(function (results) {
      results.forEach(processResult);
      done();
    });

  });

  function processResult(result) {
    if (result.code !== 0) {
      grunt.log.error(result.out);
      grunt.fail.fatal("Unable to run spellcheck on " + result.file);
    } else {
      var count = 0;
      _.chain(result.out.split("\n"))
        .reduce(function (report, line) {
          var command = line.substring(0, 1);
          var parts;
          switch (command) {
            // Miss
            case "&":
              parts = line.match(/^\&\s(.+?)\s(\d+)\s(\d+)\:\s(.+)$/);
              var original = parts[1];
              var misses = parts[4].split(", ");
              report[original] = misses;
              break;

            // None
            case "#":
              parts = line.match(/^\#\s(.+?)\s/);
              report[parts[1]] = [];
              break;

          }
          return report;
        }, {})
        .each(function (suggested, original) {
          count++;
          var suggestedText = suggested.length === 0 ? "No suggestions".italic.red : suggested.join(", ").yellow;
          grunt.log.warn("Original: " + pad(original.cyan, 40) + " Suggested: " + suggestedText);
        });
      grunt.log.ok("Spellcheck complete on " + result.file + ". Errors: " + count);
    }
  }

};