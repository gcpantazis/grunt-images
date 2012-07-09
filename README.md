#grunt-crusher

A grunt plugin that will straight-up crush some images. **Very alpha.**

By "very alpha", I mean that you should be sure you're not pointing it at any images that don't have backups / can't be regenerated easily. For your own safety.

Currently: Uses `pngnq` for PNG quantization, `pngoptim` for trimming excess data out of the files.

##How to use

* Install with: ```npm install grunt-crusher```.
* Call ```grunt.loadNpmTasks('grunt-crusher')``` in grunt.js

* In your grunt.js config:

	```
	crusher: {
		app: {
			files: [
				IMAGES + '/icons-*.png'
			],
			dest: IMAGES + '/optimized', // optional
			options: {
				eightbit: true,
				pngout: true
			}
		}
	}
	```

##Changelog

* v0.1.2 Adding `pngoptim`, start working on how different bins will operate together.
* v0.1.1 Add optional destination/export directory.
* v0.1.0 Initial release.


## License
Copyright (c) 2012 George Pantazis
Licensed under the MIT license.
