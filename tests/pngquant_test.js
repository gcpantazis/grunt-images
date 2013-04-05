var grunt = require('grunt');

exports.images = {
  compile: function(test) {
    'use strict';

    var actual, expected;

    test.expect(2);

    actual = grunt.file.read('tmp/optimized/mag-glass.png').length;
    expected = grunt.file.read('tests/expected/mag-glass.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.001, 'Quantize basic (256 colors) - Image within .1% of expected size.');

    actual = grunt.file.read('tmp/optimized/resizes/deep/directory/foo/mag-glass_full.png').length;
    expected = grunt.file.read('tests/expected/resizes/deep/directory/foo/mag-glass_full.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.001, 'Quantize @ 20 colors - Image within .1% of expected size.');

    test.done();
  }
};