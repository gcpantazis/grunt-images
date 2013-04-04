module.exports = function(grunt) {

  var IMAGES = 'tests/fixtures';

  grunt.initConfig({

    "images-pngquant": {

      plainCrush: {
        imageDirectory: IMAGES,
        files: IMAGES + '/mag-glass.png',
        destination: 'tmp',
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

      // PNGmedium: {
      //   imageDirectory: IMAGES,
      //   files: IMAGES + '/deep/directory/foo/*.png',
      //   destination: 'tmp/optimized/resizes',
      //   outputSuffix: '_medium',
      //   keepDirectoryStructure: true,
      //   tasks: {
      //     convert: {
      //       resizeDimension: '66%'
      //     },
      //     pngquant: {
      //     }
      //   }
      // },

      // PNGsmall: {
      //   imageDirectory: IMAGES,
      //   files: IMAGES + '/deep/directory/foo/*.png',
      //   destination: 'tmp/optimized/resizes',
      //   outputSuffix: '_small',
      //   keepDirectoryStructure: true,
      //   tasks: {
      //     convert: {
      //       resizeDimension: '33%'
      //     },
      //     pngquant: {
      //     }
      //   }
      // },

      // JPEGresize: {
      //   imageDirectory: IMAGES,
      //   files: IMAGES + '/resize_originals/*.jpg',
      //   destination: 'tmp/optimized/jpeg_resizes',
      //   outputSuffix: '_thumb',
      //   tasks: {
      //     convert: {
      //       resizeDimension: '300x300',
      //       quality: 25
      //     }
      //   }
      // }

    }

  });

  // Default task.
  grunt.registerTask('default', 'images-pngquant');
  grunt.registerTask('test', 'images-pngquant');

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

};
