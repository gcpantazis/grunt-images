/*
 * grunt-crusher
 * https://github.com/gcpantazis/grunt-crusher
 *
 * Copyright (c) 2012 George Pantazis
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	var exec = require('child_process').exec;
	var _ = require('underscore');

	grunt.registerMultiTask( 'crusher', 'Crushes your images.', function() {

		// Tell grunt this task is asynchronous.
		var done = this.async(),
			imageDirectory = this.data.imageDirectory,
			crusherTasks = this.data.crusherTasks,
			dest = this.data.destination,
			keepDirectoryStructure = this.data.keepDirectoryStructure,
			files = grunt.file.expandFiles(this.data.files),
			fileCount = files.length;

		if ( !crusherTasks ) {
			grunt.log.error('Crusher Error: crusherTasks was not defined.');
			done(false);
			return;
		}

		if ( !imageDirectory ) {
			grunt.log.error('Crusher Error: imageDirectory was not defined.');
			done(false);
			return;
		}

		if ( files.length === 0 ) {
			grunt.log.error('Crusher Error: No images matched.');
			done(true);
			return;
		}

		var fileIterator = 0;

		if ( dest !== undefined ) {
			grunt.file.mkdir(dest);
		}

		files.forEach(function( filepath ) {

			if ( !filepath.match(imageDirectory) ) {
				grunt.log.error('Crusher Error: File ' + filepath + ' was not within imageDirectory. Skipping.');
				fileIterator++;
				return;
			}

			var tempFilePath;
			var tasks = [];
			var cbIterator = 0;

			for ( var i in crusherTasks ) {

				if (!crusherTasks[i].binLocation) {
					grunt.log.error('Crusher Error: Task ' + i + ' did not provide a bin location.');
					return;
				}

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
							grunt.helper('pngquant', crusherTasks.pngquant.binLocation, tempFilePath, cbRouter);
						break;
						case 'pngout':
							grunt.helper('pngout', crusherTasks.pngout.binLocation, tempFilePath, cbRouter);
						break;
						case 'convert':
							grunt.helper('convert', crusherTasks.convert.binLocation, crusherTasks.convert.resizeDimension, tempFilePath, cbRouter);
						break;
						default:
					}
				}
			}

			var fileDone = function() {

				var destinationPath = filepath;

				if ( dest !== undefined ) {

					if ( !keepDirectoryStructure ) {
						destinationPath = dest + '/' + filepath.match(/([\w\d_-]*)\.?[^\\\/]*$/i)[0];
					} else {
						var relativeFilePath = filepath.split(imageDirectory)[1],
							fileName = filepath.match(/([\w\d_-]*)\.?[^\\\/]*$/i)[0],
							relativeDirectory = relativeFilePath.split(fileName)[0];

						destinationPath = dest + relativeDirectory + fileName;
					}

				}

				grunt.helper('updateOriginalFile', destinationPath, tempFilePath);
				grunt.helper('deleteTempFile', tempFilePath, function() {

					var oldFile = grunt.file.read(filepath);
					var newFile = grunt.file.read(destinationPath);

					var savings = Math.floor(( oldFile.length - newFile.length ) / oldFile.length * 100 );

					if ( filepath !== destinationPath ) {

						grunt.log.writeln(
							'CRUSHED: ' +
							filepath +
							' => ' +
							destinationPath +
							' [ ' + savings + '% Compression ]'
						);
					} else {
						grunt.log.writeln(
							'CRUSHED: ' +
							filepath +
							' [ ' + savings + '% Compression ]'
						);
					}

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

		var tempPath = originalPath.replace('.png', '-gruntCrusherTemp.png');

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

		var command = binLocation + ' -s 1 -force -ext .png 256 ';

		command += filepath;

		exec( command, function(err) {

			callback(err);

		});
	});

	grunt.registerHelper('pngout', function(binLocation, filepath, callback) {

		var command = binLocation + ' ' + filepath;

		exec( command, function(err) {

			callback(err);

		});
	});

	grunt.registerHelper('convert', function(binLocation, resizeDimension, filepath, callback) {

		var command = binLocation + ' ' + filepath;

		command += ' -resize ' + resizeDimension;

		command += ' ' + filepath;

		exec( command, function(err) {

			callback(err);

		});
	});

};
