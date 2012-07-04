/*
 * grunt-crusher
 * https://github.com/gcpantazis/grunt-crusher
 *
 * Copyright (c) 2012 George Pantazis
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	grunt.registerMultiTask( "crusher", "Crushes your images.", function() {

		// Tell grunt this task is asynchronous.
		var done = this.async(),
			exec = require('child_process').exec,
			eightbit = this.data.eightbit,
			files = grunt.file.expandFiles(this.data.files),
			fileCount = files.length;

		var i = 0;

		// Right now, only run pngquant to crush 24bit PNGs into 8bit.
		
		if ( eightbit ) {

			files.forEach(function( filepath ) {

				var command = __dirname + "/../bin/pngquant -s 1 -force -ext -temp.png 256";

				if ( filepath.length === 0 ) return;

				command += ' ' + filepath;

				var newFileLocation = filepath.replace('.png', '-temp.png');

				exec(command, function(err) {

					if (err) {
						grunt.warn(err);
						done(false);
						return;
					}

					grunt.log.writeln('CRUSHED: ' + filepath);
					grunt.file.copy(newFileLocation, filepath);
					exec('rm ' + newFileLocation);

					i++

					if ( i === fileCount ) {
						done();
					}

				});

			});

		}

	});

};