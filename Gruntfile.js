module.exports = function(grunt) {

  var IMAGES = 'tests/fixtures';

  grunt.initConfig({

    "images-pngquant": {

      plainCrush: {
        imageDirectory: IMAGES,
        files: IMAGES + '/mag-glass.png',
        destination: 'tmp/optimized',
        options: {}
      },

      PNGoriginals: {
        imageDirectory: IMAGES,
        files: IMAGES + '/deep/directory/foo/*.png',
        destination: 'tmp/optimized/resizes',
        outputSuffix: '_full',
        keepDirectoryStructure: true,
        options: {}
      }
    },

    "images-convert": {

      PNGmedium: {
        imageDirectory: IMAGES,
        files: IMAGES + '/deep/directory/foo/*.png',
        destination: 'tmp/optimized/resizes',
        outputSuffix: '_medium',
        keepDirectoryStructure: true,
        options: {
          resizeDimension: '66%'
        }
      },

      PNGsmall: {
        imageDirectory: IMAGES,
        files: IMAGES + '/deep/directory/foo/*.png',
        destination: 'tmp/optimized/resizes',
        outputSuffix: '_small',
        keepDirectoryStructure: true,
        options: {
          resizeDimension: '33%'
        }
      },

      JPEGresize: {
        imageDirectory: IMAGES,
        files: IMAGES + '/resize_originals/*.jpg',
        destination: 'tmp/optimized/jpeg_resizes',
        outputSuffix: '_thumb',
        options: {
          resizeDimension: '300x300'
        }
      }

    }

  });

  // Default task.
  grunt.registerTask('default', ['images-pngquant', 'images-convert']);
  grunt.registerTask('test', ['images-pngquant', 'images-convert']);

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

};
