/*
 * grunt-images
 * https://github.com/gcpantazis/grunt-images
 *
 * Copyright (c) 2012 George Pantazis
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  var exec = require('child_process').exec;

  var runner = function(buildType) {

    // Tell grunt this task is asynchronous.
    var currentTask = grunt.task.current,
        done = currentTask.async(),
        imageDirectory = currentTask.data.imageDirectory,
        dest = currentTask.data.destination,
        keepDirectoryStructure = currentTask.data.keepDirectoryStructure,
        outputSuffix = currentTask.data.outputSuffix,
        files = grunt.file.expand(currentTask.data.files),
        fileCount = files.length;

    if ( !dest && outputSuffix ) {
      grunt.log.error('Images Error: "outputSuffix" was set, but "destination" was not. Please set both if using "outputSuffix".');
      done(false);
      return;
    }

    if ( !imageDirectory ) {
      grunt.log.error('Images Error: imageDirectory was not defined.');
      done(false);
      return;
    }

    if ( files.length === 0 ) {
      grunt.log.error('Images Error: No images matched.');
      done(true);
      return;
    }

    var fileIterator = 0;

    if ( dest ) {
      grunt.file.mkdir(dest);
    }

    files.forEach(function( filepath ) {

      var tempFilePath;

      if ( !filepath.match(imageDirectory) ) {
        grunt.log.error('Images Error: File ' + filepath + ' was not within imageDirectory. Skipping.');
        fileIterator++;
        return;
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

          fileIterator++;

          if ( fileIterator === fileCount ) {
            done();
          }
        });
      };

      createTempFile(filepath, function(tempPath){
        tempFilePath = tempPath;

        switch (buildType) {
          case 'images-pngquant':
            pngquant(currentTask.data.options, tempFilePath, fileDone);
          break;
          case 'images-convert':
            convert(currentTask.data.options, tempFilePath, fileDone);
          break;
          default:
        }
      });
    });
  };

  grunt.registerMultiTask('images-pngquant', 'Optimize PNGs with pngquant.', function() {
    runner('images-pngquant');
  });

  grunt.registerMultiTask('images-convert', 'Manipulate images with Imagemagick.', function() {
    runner('images-convert');
  });

  var createTempFile = function(sourcePath, callback){

    var tempPath = sourcePath;

    tempPath = tempPath.replace('.png', '-gruntImagesTemp.png');
    tempPath = tempPath.replace('.jpg', '-gruntImagesTemp.jpg');

    grunt.file.copy(sourcePath, tempPath);

    callback(tempPath);
  };

  var updateOriginalFile = function(sourcePath, destinationPath, tempPath){

    var oldFile = grunt.file.read(sourcePath),
        newFile = grunt.file.read(tempPath),
        savings = Math.floor(( oldFile.length - newFile.length ) / oldFile.length * 100 );

    if ( sourcePath !== destinationPath ) {
      grunt.log.writeln(
        'Complete: ' +
        sourcePath +
        ' => ' +
        destinationPath +
        ' [ ' + savings + '% Compression ]'
      );
    } else {
      grunt.log.writeln(
        'Complete: ' +
        sourcePath +
        ' [ ' + savings + '% Compression ]'
      );
    }

    grunt.file.copy(tempPath, destinationPath);
  };

  var deleteTempFile = function(path, callback){

    exec('rm ' + path, function(){
      if (callback) { callback(); }
    });
  };

  var pngquant = function(options, filepath, callback) {

    var colorCount = options.colorCount || 256,
        command = __dirname + '/../compiled/improved-pngquant/pngquant -s 1 -force -ext .png ';

    command += colorCount;
    command += ' ';
    command += filepath;

    exec( command, function(err) {
      callback(err);
    });
  };

  var convert = function(options, filepath, callback) {

    var command = __dirname + '/../compiled/imagemagick/utilities/convert ' + filepath;

    if ( options.resize ) {
      command += ' -resize ' + options.resize;
    }

    if ( options.quality ) {
      command += ' -quality ' + options.quality;
    }

    command += ' ' + filepath;

    exec( command, function(err) {
      callback(err);
    });
  };
};
