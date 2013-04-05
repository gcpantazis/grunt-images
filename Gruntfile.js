module.exports = function(grunt) {

  var IMAGES = 'tests/fixtures';

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

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
        options: {
          colorCount: 20
        }
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
          resize: '66%'
        }
      },

      PNGsmall: {
        imageDirectory: IMAGES,
        files: IMAGES + '/deep/directory/foo/*.png',
        destination: 'tmp/optimized/resizes',
        outputSuffix: '_small',
        keepDirectoryStructure: true,
        options: {
          resize: '33%'
        }
      },

      JPEGresize: {
        imageDirectory: IMAGES,
        files: IMAGES + '/resize_originals/*.jpg',
        destination: 'tmp/optimized/jpeg_resizes',
        outputSuffix: '_thumb',
        options: {
          resize: '300x300'
        }
      }
    },

    // Unit tests.
    "nodeunit": {
      tests: ['tests/*_test.js']
    }

  });

  // Default task.
  grunt.registerTask('test', ['clean', 'jshint', 'images-pngquant', 'images-convert', 'nodeunit']);
  grunt.registerTask('default', ['test']);

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
};
