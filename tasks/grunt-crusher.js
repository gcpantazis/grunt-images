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
			outputSuffix = this.data.outputSuffix,
			files = grunt.file.expand(this.data.files),
			fileCount = files.length;

		if ( !crusherTasks ) {
			grunt.log.error('Crusher Error: crusherTasks was not defined.');
			done(false);
			return;
		}

		if ( !dest && outputSuffix ) {
			grunt.log.error('Crusher Error: "outputSuffix" was set, but "destination" was not. Please set both if using "outputSuffix".');
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
							pngquant(crusherTasks.pngquant, tempFilePath, cbRouter);
						break;
						case 'pngout':
							pngout(crusherTasks.pngout, tempFilePath, cbRouter);
						break;
						case 'convert':
							convert(crusherTasks.convert, tempFilePath, cbRouter);
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

					if ( outputSuffix ) {

						var splitPath = destinationPath.split('.');
						splitPath[splitPath.length - 2] += outputSuffix;
						destinationPath = splitPath.join('.');

					}

				}

				updateOriginalFile(filepath, destinationPath, tempFilePath);
				deleteTempFile(tempFilePath, function() {

					fileIterator++

					if ( fileIterator === fileCount ) {
						done();
					}

				});
			}

			createTempFile(filepath, function(tempPath){

				tempFilePath = tempPath;
				doNextProcess(0);

			});

		});
	});

	var createTempFile = function(originalPath, callback){

		var tempPath = originalPath;

		// This should be smarter, obvious ways this could fail.
		tempPath = tempPath.replace('.png', '-gruntCrusherTemp.png');
		tempPath = tempPath.replace('.jpg', '-gruntCrusherTemp.jpg');

		grunt.file.copy(originalPath, tempPath);

		callback(tempPath);
	};

	updateOriginalFile = function(originalPath, destinationPath, tempPath){

		var oldFile = grunt.file.read(originalPath);
		var newFile = grunt.file.read(tempPath);
		var savings = Math.floor(( oldFile.length - newFile.length ) / oldFile.length * 100 );

		if ( originalPath !== destinationPath ) {

			grunt.log.writeln(
				'CRUSHED: ' +
				originalPath +
				' => ' +
				destinationPath +
				' [ ' + savings + '% Compression ]'
			);
		} else {
			grunt.log.writeln(
				'CRUSHED: ' +
				originalPath +
				' [ ' + savings + '% Compression ]'
			);
		}

		grunt.file.copy(tempPath, destinationPath);

	};

	deleteTempFile = function(path, callback){

		exec('rm ' + path, function(){
			if (callback) callback();
		});

	};

	pngquant = function(pngquantTask, filepath, callback) {

		var command = pngquantTask.binLocation + ' -s 1 -force -ext .png 256 ';

		command += filepath;

		exec( command, function(err) {

			callback(err);

		});
	};

	pngout = function(pngoutTask, filepath, callback) {

		var command = pngoutTask.binLocation + ' ' + filepath;

		exec( command, function(err) {

			callback(err);

		});
	};

	convert = function(convertTask, filepath, callback) {

		var command = convertTask.binLocation + ' ' + filepath;

		if ( convertTask.resizeDimension ) {
			command += ' -resize ' + convertTask.resizeDimension;
		}

		if ( convertTask.quality ) {
			command += ' -quality ' + convertTask.quality;
		}

		command += ' ' + filepath;

		exec( command, function(err) {

			callback(err);

		});
	};

};
