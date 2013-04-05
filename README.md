#grunt-images [![Build Status](https://api.travis-ci.org/gcpantazis/grunt-images.png?branch=master)](http://travis-ci.org/gcpantazis/grunt-images)

A grunt plugin for processing images. Libraries are automatically downloaded and compiled for the plugin to use, if needed or specified in the options.

##How to use

* Install with: ```npm install grunt-images```.
* Call ```grunt.loadNpmTasks('grunt-images')``` in grunt.js

* In your grunt.js config:

  ```
  "images-pngquant": {

    basic: {
      imageDirectory: 'images,
      files: 'images/bar.png',
      destination: 'tmp/optimized',
      options: {}
    },

    low-color: {
      imageDirectory: 'images',
      files: 'images/deep/directory/foo/*.png',
      destination: 'tmp/optimized/resizes',
      outputSuffix: '_full',
      keepDirectoryStructure: true,
      options: {
        colorCount: 20
      }
    }
  },

  "images-convert": {

    png-resize: {
      imageDirectory: 'images',
      files: 'images/deep/directory/foo/*.png',
      destination: 'tmp/optimized/resizes',
      outputSuffix: '_small',
      keepDirectoryStructure: true,
      options: {
        resize: '33%'
      }
    },

    jpg-resize: {
      imageDirectory: 'images',
      files: 'images/resize_originals/*.jpg',
      destination: 'tmp/optimized/jpeg_resizes',
      outputSuffix: '_thumb',
      options: {
        resize: '300x300'
      }
    }
  }
  ```

##Settings

`imageDirectory` ***required*** : Used to determine relative filepaths, in case you want to preserve the directory structure in the output folder. Files that aren't within this folder will be rejected.

`files` ***required*** : Array of files / wildcards for images to iterate through.

`destination` *optional* : If provided, copies files to the destination directory after optimizations are complete. If omitted, replaces original with optimized file.

`outputSuffix` *optional* : Use to add a suffix onto output filenames (someimage.jpg -> someimage_foo.jpg). Requires `destination`.

`keepDirectoryStructure` *optional* : If omitted or set to false, the destination folder will be flat. If set to true, destination folder will contain the original files' folder structure relative to `imageDirectory`.

`alwaysCompile` *optional* : If true, `grunt-images` will compile the necessary library even if they are already available on the system.

##Supported Libraries

###pngquant

* `colorCount`: *Number, 0-256*, number of colors that should be used to quantize the PNG's color channels to 8-bit.

###convert

* `resize`: Passes an option to convert's resize flag. See imagemagick [documentation on this feature](http://www.imagemagick.org/Usage/resize/) for possible inputs.

##Changelog

Current: v0.2.1

Major Changes:

* v0.2.0 Make separate multiTasks for each library.
* v0.1.16 Make `convert` (imagemagick) and `pngquant` compile on install, rather than requiring a bin location. Remove `pngout` since it can't be compiled / is close-sourced.
* v0.1.15 Upgrade for Grunt 0.4 compatibility.
* v0.1.12 Added `outputSuffix`.
* v0.1.10 Added experimental support for `convert`, initially for resize.
* v0.1.9 Added tests, some refactoring on logging.
* v0.1.6 Add `imageDirectory` and `keepDirectoryStructure` settings.
* v0.1.4 Make it so that you have to define the bin locations as part of the task; making it platform independant was too tricky here. `dest` -> `destination` in task settings.
* v0.1.2 Adding `pngout`, start working on how different bins will operate together.
* v0.1.1 Add optional destination/export directory.
* v0.1.0 Initial release.

## License
Copyright (c) 2012 George Pantazis
Licensed under the MIT license.
