[![build status](https://secure.travis-ci.org/gcpantazis/grunt-crusher.png)](http://travis-ci.org/gcpantazis/grunt-crusher)
#grunt-crusher

A grunt plugin that will straight-up crush some images.

##How to use

* Install with: ```npm install grunt-crusher```.
* Call ```grunt.loadNpmTasks('grunt-crusher')``` in grunt.js

* In your grunt.js config:

	```
	crusher: {
		taskOne: {
			imageDirectory: '/path/to/images/',
			files: [
				'/path/to/images/foo-*.png',
			],
			crusherTasks: {
				pngquant: {
					binLocation: './bin/pngquant'
				}
			}
		},
		taskTwo: {
			imageDirectory: '/path/to/images/',
			files: [
				'/path/to/images/foo/*.png',
				'/path/to/images/bar/*.png',
				'/path/to/images/baz/*.png'
			],
			destination: IMAGES + '/optimized',
			keepDirectoryStructure: true,
			crusherTasks: {
				pngquant: {
					binLocation: './bin/pngquant'
				},
				pngout: {
					binLocation: './bin/pngout'
				}
			}
		}
	}
	```

##Settings

`imageDirectory` ***required*** : Used to determine relative filepaths, in case you want to preserve the directory structure in the output folder. Files that aren't within this folder will be rejected.

`files` ***required*** : Array of files / wildcards for crusher to iterate through.

`destination` *optional* : If provided, copies files to the destination directory after optimizations are complete. If omitted, replaces original with optimized file.

`keepDirectoryStructure` *optional* : If omitted or set to false, the destination folder will be flat. If set to true, destination folder will contain the original files' folder structure relative to `imageDirectory`.

`crusherTasks` ***required*** : Configure each bin. (TODO: Add config options in *supported libraries* section once available).

##Supported Libraries

`pngquant`

`pngout`

##Changelog

Current: v0.1.8

Major Changes:

* v0.1.6 Add `imageDirectory` and `keepDirectoryStructure` settings.
* v0.1.4 Make it so that you have to define the bin locations as part of the task; making it platform independant was too tricky here. `dest` -> `destination` in task settings.
* v0.1.2 Adding `pngout`, start working on how different bins will operate together.
* v0.1.1 Add optional destination/export directory.
* v0.1.0 Initial release.


## License
Copyright (c) 2012 George Pantazis
Licensed under the MIT license.
