var grunt = require('grunt');

exports.images = {
  compile: function(test) {
    'use strict';

    var actual, expected;

    test.expect(2);

    actual = grunt.file.read('tmp/optimized/mag-glass.png').length;
    expected = grunt.file.read('tests/expected/mag-glass.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.03, (function(){
      return 'Quantize basic (256 colors) - Actual size ('+actual+') within 3% of expected size ('+expected+').';
    })());

    actual = grunt.file.read('tmp/optimized/resizes/deep/directory/foo/mag-glass_full.png').length;
    expected = grunt.file.read('tests/expected/resizes/deep/directory/foo/mag-glass_full.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.03, (function(){
      return 'Quantize @ 20 colors - Actual size ('+actual+') within 3% of expected size ('+expected+').';
    })());

    test.done();
  }
};
