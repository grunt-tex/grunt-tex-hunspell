var expect = require("chai").expect;
var exec   = require("exec");
var path   = require("path");
var strip  = require("stripcolorcodes");

var execOpts = {
  cwd: path.join(__dirname, "..")
};

describe("When there are no spelling errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt hunspell:succeed", execOpts, function (_err, _out, _code) {
      out = strip(_out);
      code = _code;
      done();
    });
  });

  it("should have output code 0", function () {
    expect(code).to.equal(0);
  });

  it("should output success message", function () {
    expect(out).to.contain("Done, without errors.");
    expect(out).to.contain("Spellcheck complete on test/fixtures/succeed.tex");
  });

  it("should not output suggestions", function () {
    expect(out).to.not.contain("Original:");
    expect(out).to.not.contain("Suggested: No suggestions");
  });

});

describe("When there are spelling errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt hunspell:warn", execOpts, function (_err, _out, _code) {
      out = strip(_out);
      code = _code;
      done();
    });
  });

  it("should have output code 0", function () {
    expect(code).to.equal(0);
  });

  it("should still output success message", function () {
    expect(out).to.contain("Done, without errors.");
    expect(out).to.contain("Spellcheck complete on test/fixtures/warn.tex");
  });

  it("should output error message", function () {
    expect(out).to.contain("Original: Missspelt");
    expect(out).to.contain("Suggested: No suggestions");
  });

});