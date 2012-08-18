/*
 * grunt-crusher
 * https://github.com/gcpantazis/grunt-crusher
 *
 * Copyright (c) 2012 George Pantazis
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	var exec = require('child_process').exec;

	grunt.registerMultiTask( "crusher", "Crushes your images.", function() {

		// Tell grunt this task is asynchronous.
		var done = this.async(),
			crusherTasks = this.data.crusherTasks,
			dest = this.data.destination,
			files = grunt.file.expandFiles(this.data.files),
			fileCount = files.length;

		if ( !crusherTasks ) {
			grunt.log.error('Crusher: crusherTasks was not defined.');
			return;
		}

		var fileIterator = 0;

		if ( dest !== undefined ) {
			grunt.file.mkdir(dest);
		}

		files.forEach(function( filepath ) {

			var tempFilePath;
			var tasks = [];
			var cbIterator = 0;

			for ( var i in crusherTasks ) {
				tasks.push(i);
			}

			var cbRouter = function(err) {

				if (err) {
					grunt.warn(err);
					done(false);
					return;
				}

				cbIterator++;
				doNextProcess(cbIterator);
			}

			var doNextProcess = function(which) {

				if ( which === tasks.length ) {

					fileDone();

				} else {

					switch (tasks[which]) {
						case 'pngquant':
							grunt.helper('pngquant', crusherTasks.pngquant, tempFilePath, cbRouter);
						break;
						case 'pngout':
							grunt.helper('pngout', crusherTasks.pngout, tempFilePath, cbRouter);
						break;
						default:
					}
				}
			}

			var fileDone = function() {

				var destinationPath = filepath;

				if ( dest !== undefined ) {
					destinationPath = dest + "/" + filepath.match(/([\w\d_-]*)\.?[^\\\/]*$/i)[0];
				}

				grunt.helper('updateOriginalFile', destinationPath, tempFilePath);
				grunt.helper('deleteTempFile', tempFilePath, function() {

					grunt.log.writeln('CRUSHED: ' + filepath);

					fileIterator++

					if ( fileIterator === fileCount ) {
						done();
					}

				});
			}

			grunt.helper('createTempFile', filepath, function(tempPath){

				tempFilePath = tempPath;
				doNextProcess(0);
			});

		});
	});

	grunt.registerHelper('createTempFile', function(originalPath, callback){

		var tempPath = originalPath.replace('.png', '-temp.png');

		grunt.file.copy(originalPath, tempPath);

		callback(tempPath);
	});

	grunt.registerHelper('updateOriginalFile', function(destinationPath, tempPath){

		grunt.file.copy(tempPath, destinationPath);

	});

	grunt.registerHelper('deleteTempFile', function(path, callback){

		exec('rm ' + path, function(){
			if (callback) callback();
		});

	});

	grunt.registerHelper('pngquant', function(binLocation, filepath, callback) {

		var command = binLocation + " -s 1 -force -ext .png 256 ";

		command += filepath;

		exec( command, function(err) {

			callback(err);

		});
	});

	grunt.registerHelper('pngout', function(binLocation, filepath, callback) {

		var command = binLocation + " " + filepath;

		exec( command, function(err) {

			callback(err);

		});
	});
};
