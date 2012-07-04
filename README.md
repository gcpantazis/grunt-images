# grunt-crusher

A grunt plugin that will straight-up crush some images.

Right now I've only added 24-bit > 8-bit crushing. Goal is to integrate all the different smashers/smushers/crunchers that you could possibly need for all image types.

##How to use

* Install with: ```npm install grunt-crusher```.
* Call ```grunt.loadNpmTasks('grunt-crusher')``` in grunt.js

* In your grunt.js config:

	```
	crusher: {
		app: {
			files: [
				'/some-image.png',
				'/other/images/**/*.png'
			],
			dest: '/where/to/save/images', // Optional, will overwrite images if omitted.
			eightbit: true
		}
	}
	```

##Changelog

* v0.1.1 Add optional destination/export directory.
* v0.1.0 Initial release.


## License
Copyright (c) 2012 George Pantazis
Licensed under the MIT license.
