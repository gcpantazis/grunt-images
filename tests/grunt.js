module.exports = function(grunt) {

	var ROOT = '.';
	var IMAGES = ROOT + '/images';
	var BINS = ROOT + '/bins';

	// Project configuration.
	grunt.initConfig({

		crusher: {
			taskOne: {
				imageDirectory: IMAGES,
				files: [
					IMAGES + '/path/to/images/foo-*.png',
				],
				crusherTasks: {
					pngquant: {
						binLocation: BINS + '/pngquant'
					}
				}
			},
			taskTwo: {
				imageDirectory: '/path/to/images/',
				files: [
					IMAGES + '/path/to/images/foo/*.png',
					IMAGES + '/path/to/images/bar/*.png',
					IMAGES + '/path/to/images/baz/*.png'
				],
				destination: ROOT + '/optimized',
				keepDirectoryStructure: true,
				crusherTasks: {
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
