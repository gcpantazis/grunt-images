var grunt = require('grunt');

exports.images = {
  compile: function(test) {
    'use strict';

    var actual, expected;

    test.expect(3);

    actual = grunt.file.read('tmp/optimized/jpeg_resizes/nasa_thumb.jpg').length;
    expected = grunt.file.read('tests/expected/jpeg_resizes/nasa_thumb.jpg').length;
    test.ok(Math.abs(actual-expected) / expected < 0.001, 'JPEG PXxPX resize - Image within .1% of expected size.');

    actual = grunt.file.read('tmp/optimized/resizes/deep/directory/foo/mag-glass_medium.png').length;
    expected = grunt.file.read('tests/expected/resizes/deep/directory/foo/mag-glass_medium.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.001, 'PNG 66% Resize - Image within .1% of expected size.');

    actual = grunt.file.read('tmp/optimized/resizes/deep/directory/foo/mag-glass_small.png').length;
    expected = grunt.file.read('tests/expected/resizes/deep/directory/foo/mag-glass_small.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.001, 'PNG 33% Resize - Image within .1% of expected size.');

    test.done();
  }
};