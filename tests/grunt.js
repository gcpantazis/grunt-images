module.exports = function(grunt) {

	var IMAGES = 'images';
	var BINS = 'bins';

	// Project configuration.
	grunt.initConfig({

		crusher: {

			taskOne: {
				imageDirectory: IMAGES,
				files: [
					IMAGES + '/dice.png',
				],
				crusherTasks: {
					pngquant: {
						binLocation: BINS + '/pngquant'
					}
				}
			},

			taskTwo: {
				imageDirectory: IMAGES,
				files: [
					IMAGES + '/deep/directory/foo/*.png'
				],
				destination: 'optimized',
				outputSuffix: '_foo',
				keepDirectoryStructure: true,
				crusherTasks: {
					convert: {
						binLocation: BINS + '/convert',
						resizeDimension: '50%'
					},
					pngquant: {
						binLocation: BINS + '/pngquant'
					},
					pngout: {
						binLocation: BINS + '/pngout'
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
