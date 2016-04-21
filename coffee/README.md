## File layout for coffeescript project, with livereload and auto test.

## Main components:

* gulp
* browserSync
* mocha

## Get started:

	npm install
	gulp                # default = watch
	# or
	gulp watch-web      # for livereload
	gulp watch-test     # for mocha auto test

## To update versions of package.json dependencies:

	$ npm outdated
    # or
	$ npm install -g npm-check-updates
	$ npm-check-updates
    # update package.json with new versions if you agree
	$ npm-check-updates -u	
