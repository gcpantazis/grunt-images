module.exports = function(grunt) {

  var IMAGES = 'images';

  grunt.initConfig({

    crusher: {

      plainCrush: {
        imageDirectory: IMAGES,
        files: IMAGES + '/dice.png',
        crusherTasks: {
          pngquant: {
          }
        }
      },

      PNGoriginals: {
        imageDirectory: IMAGES,
        files: IMAGES + '/deep/directory/foo/*.png',
        destination: 'optimized/resizes',
        outputSuffix: '_full',
        keepDirectoryStructure: true,
        crusherTasks: {
          pngquant: {
          }
        }
      },

      PNGmedium: {
        imageDirectory: IMAGES,
        files: IMAGES + '/deep/directory/foo/*.png',
        destination: 'optimized/resizes',
        outputSuffix: '_medium',
        keepDirectoryStructure: true,
        crusherTasks: {
          convert: {
            resizeDimension: '66%'
          },
          pngquant: {
          }
        }
      },

      PNGsmall: {
        imageDirectory: IMAGES,
        files: IMAGES + '/deep/directory/foo/*.png',
        destination: 'optimized/resizes',
        outputSuffix: '_small',
        keepDirectoryStructure: true,
        crusherTasks: {
          convert: {
            resizeDimension: '33%'
          },
          pngquant: {
          }
        }
      },

      JPEGresize: {
        imageDirectory: IMAGES,
        files: IMAGES + '/resize_originals/*.jpg',
        destination: 'optimized/jpeg_resizes',
        outputSuffix: '_thumb',
        crusherTasks: {
          convert: {
            resizeDimension: '300x300',
            quality: 25
          }
        }
      }

    }

  });

  // Default task.
  grunt.registerTask('default', 'crusher');

  // load grunt plugins
  grunt.loadNpmTasks('../../../grunt-crusher');
};
