var grunt = require('grunt');

exports.images = {
  compile: function(test) {
    'use strict';

    var actual, expected;

    test.expect(4);

    actual = grunt.file.read('tmp/optimized/jpeg_resizes/nasa_thumb.jpg').length;
    expected = grunt.file.read('tests/expected/jpeg_resizes/nasa_thumb.jpg').length;
    test.ok(Math.abs(actual-expected) / expected < 0.03, (function(){
      return 'JPEG PXxPX resize - Actual size ('+actual+') within 3% of expected size ('+expected+').';
    })());

    actual = grunt.file.read('tmp/optimized/resizes/deep/directory/foo/mag-glass_medium.png').length;
    expected = grunt.file.read('tests/expected/resizes/deep/directory/foo/mag-glass_medium.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.03, (function(){
      return 'PNG 66% Resize - Actual size ('+actual+') within 3% of expected size ('+expected+').';
    })());

    actual = grunt.file.read('tmp/optimized/resizes/deep/directory/foo/mag-glass_small.png').length;
    expected = grunt.file.read('tests/expected/resizes/deep/directory/foo/mag-glass_small.png').length;
    test.ok(Math.abs(actual-expected) / expected < 0.03, (function(){
      return 'PNG 33% Resize - Actual size ('+actual+') within 3% of expected size ('+expected+').';
    })());

    actual = grunt.file.exists('tmp/optimized/src_as_array/mag-glass_medium.png');
    expected = true;
    test.ok(actual === expected, (function(){
      return 'Expected file "tmp/optimized/src_as_array/mag-glass_medium.png" to exists';
    })());

    test.done();
  }
};
