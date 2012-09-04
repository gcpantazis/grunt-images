module.exports = function(grunt) {

	var IMAGES = 'images';
	var BINS = 'bins';

	// Project configuration.
	grunt.initConfig({

		crusher: {

			plainCrush: {
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

			PNGoriginals: {
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

			PNGmedium: {
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

			PNGsmall: {
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
			},

			JPEGresize: {
				imageDirectory: IMAGES,
				files: [
					IMAGES + '/resize_originals/*.jpg'
				],
				destination: 'optimized/jpeg_resizes',
				outputSuffix: '_thumb',
				crusherTasks: {
					convert: {
						binLocation: BINS + '/convert',
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
