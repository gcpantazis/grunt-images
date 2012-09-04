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
					},
					pngout: {
						binLocation: BINS + '/pngout'
					}
				}
			},

			originals: {
				imageDirectory: IMAGES,
				files: [
					IMAGES + '/deep/directory/foo/*.png'
				],
				destination: 'optimized/resizes',
				outputSuffix: '_full',
				keepDirectoryStructure: true,
				crusherTasks: {
					pngquant: {
						binLocation: BINS + '/pngquant'
					},
					pngout: {
						binLocation: BINS + '/pngout'
					}
				}
			},

			medium: {
				imageDirectory: IMAGES,
				files: [
					IMAGES + '/deep/directory/foo/*.png'
				],
				destination: 'optimized/resizes',
				outputSuffix: '_medium',
				keepDirectoryStructure: true,
				crusherTasks: {
					convert: {
						binLocation: BINS + '/convert',
						resizeDimension: '66%'
					},
					pngquant: {
						binLocation: BINS + '/pngquant'
					},
					pngout: {
						binLocation: BINS + '/pngout'
					}
				}
			},

			small: {
				imageDirectory: IMAGES,
				files: [
					IMAGES + '/deep/directory/foo/*.png'
				],
				destination: 'optimized/resizes',
				outputSuffix: '_small',
				keepDirectoryStructure: true,
				crusherTasks: {
					convert: {
						binLocation: BINS + '/convert',
						resizeDimension: '33%'
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
