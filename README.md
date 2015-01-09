# grunt-tex-hunspell [![Build Status](https://travis-ci.org/grunt-tex/grunt-tex-hunspell.svg?branch=master)](https://travis-ci.org/grunt-tex/grunt-tex-pdflatex)

Part of the [grunt-tex](https://github.com/grunt-tex) suite of LaTeX-orientated Grunt tasks.

This plugin can be used to spellcheck LaTeX files using `hunspell` and output a report to the console.

## Getting Started
This plugin requires Grunt `~0.4.5` and hunspell to be available.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tex-hunspell --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tex-hunspell');
```

## The "hunspell" task

### Overview
In your project's Gruntfile, add a section named `hunspell` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hunspell: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### options.executable
Type: `String`
Default value: `hunspell`

If hunspell is not available on the command line as `hunspell`, put it's location in this option.

#### options.args
Type: `Object`
Default value: `{ -t: null, -a: null }`

An object of arguments to pass through to hunspell as command line options. Check the hunspell [man page](http://linux.die.net/man/1/hunspell) for all options. A few rules are applied to these arguments:

* If the value of a key is `null`, it will be treated a flag, i.e. it will be compiled as `--option` rather than `--option=null`
* If the key starts with `-` and has a value, ` ` will be used to separate the key and value
* If the key starts with `--` and has a value, `=` will be used to separate the key and value

Without changing any arguments, hunspell will be executed like so:

`hunspell -t -a <document-name>`

### Usage Examples

#### Basic
This is the most basic usage of hunspell:

```js
grunt.initConfig({
  hunspell: "document.tex"
});
```

#### Multitask with custom options
In this example, hunspell is used as a multitask, with custom options used for the first document in order to make hunspell use a specific language file

```js
grunt.initConfig({
  hunspell: {
    options: {
      executable: "/usr/bin/hunspell"
    },
    documentone: {
      options: {
        args: {
          "-d": "en_US"
        }
      },
      files: [{ src: "documentone.tex" }]
    },
    documenttwo: "documenttwo.tex"
  }
});
```

#### Custom personal dictionary
In this example, an argument is passed to hunspell to tell it to use a file as a personal dictionary. This is useful if you want to have a personal dictionary per-project.

```js
grunt.initConfig({
  hunspell: {
    options: {
      args: {
        "-p": ".personal-dictionary"
      }
    },
    files: [{ src: "document.tex" }]
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-01-08   v0.1.1   Initial release
* 2015-01-09   v0.2.0   Change argument configuration
* 2015-01-09   v0.2.1   Update README
* 2015-01-09   v0.2.2   Update README