#grunt-crusher

A grunt plugin that will straight-up crush some images. **Very alpha.**

By "very alpha", I mean that you should be sure you're not pointing it at any images that don't have backups / can't be regenerated easily. For your own safety.

Currently supports `pngquant` for PNG quantization, `pngout` for trimming excess data out of the files. As part of the task you need to point crusher at the bins, which you'll either need to find or compile in your build env of choice.

##How to use

* Install with: ```npm install grunt-crusher```.
* Call ```grunt.loadNpmTasks('grunt-crusher')``` in grunt.js

* In your grunt.js config:

	```
	crusher: {
		task-one: {
			files: [
				'/path/to/images/foo-*.png',
			],
			crusherTasks: {
				pngquant: 'path/to/pngquant',
				pngout: 'path/to/pngout'
			}
		},
		task-two: {
			files: [
				'/path/to/images/foo/*.png',
				'/path/to/images/bar/*.png',
				'/path/to/images/baz/*.png'
			],
			destination: IMAGES + '/optimized',
			crusherTasks: {
				pngquant: 'path/to/pngquant'
			}
		}
	}
	```

##Changelog

Current: v0.1.5

Major Changes:

* v0.1.4 Make it so that you have to define the bin locations as part of the task; making it platform independant was too tricky here. `dest` -> `destination` in task settings.
* v0.1.2 Adding `pngout`, start working on how different bins will operate together.
* v0.1.1 Add optional destination/export directory.
* v0.1.0 Initial release.


## License
Copyright (c) 2012 George Pantazis
Licensed under the MIT license.
