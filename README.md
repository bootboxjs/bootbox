# Bootbox - Bootstrap powered alert, confirm and flexible dialog boxes

Please see http://bootboxjs.com for full usage instructions, or head over to http://paynedigital.com/bootbox for
the original writeup about the project.

## Contact

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/makeusabrew/bootbox?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

The easiest thing is to [find me on twitter @makeusabrew](http://twitter.com/makeusabrew).

## Contributing

Please see the [CONTRIBUTING](https://github.com/makeusabrew/bootbox/blob/master/CONTRIBUTING.md) file for guidelines.

## Running Tests [![Build Status](https://api.travis-ci.org/makeusabrew/bootbox.svg)](http://travis-ci.org/makeusabrew/bootbox)

Tests are run using [Karma](http://karma-runner.github.io/0.8/index.html) using the Mocha test adapter.
To run the tests yourself, simply run ```npm install``` within the project followed by ```npm test```.
Please note that this will require [PhantomJS](http://phantomjs.org/) being installed and in your path - if
it is not, you may run the tests and capture browsers manually by running ```karma start``` from the root
of the project.

The project is also hosted on [Travis CI](https://travis-ci.org/makeusabrew/bootbox) - when submitting
pull requests **please** ensure your tests pass as failing requests will be rejected. See the
[CONTRIBUTING](https://github.com/makeusabrew/bootbox/blob/master/CONTRIBUTING.md) file for more information.

## Building a minified release

The repository no longer contains a minified bootbox.min.js file - this is now only generated
[for releases](https://github.com/makeusabrew/bootbox/releases). To build your own minified copy
for use in development simply run ```npm install``` if you haven't already, followed by ```grunt uglify```.
This will generate a bootbox.min.js file in your working directory.

## A note on Bootstrap dependencies

Bootbox **4.0.0** is the first release to support Bootstrap 3.0.0.

Bootbox **3.3.0** is the *last* release to support Bootstrap 2.2.x.

Much more dependency information can be found [on the Bootbox website](http://bootboxjs.com/#dependencies).

### Roadmap

The latest major release of Bootbox - 4.0.0 - involved a total rewrite of the
internal code and introduced an entirely new public API. It has not re-implemented
some functionality from the 3.x series as of yet; this will be addressed in the
form of new minor releases. Please feel free to add feedback and requests.

There is a [partial roadmap](https://github.com/makeusabrew/bootbox/issues/545) for the next major release (5.x). Subject to change at any time. The primary goal will be Bootstrap 4 compatibility, which is still a moving target at the moment. If you would like to contribute to the next version of Bootbox, please work from the [v5.x](https://github.com/makeusabrew/bootbox/tree/v5.x) branch when forking the repository.

### Latest Release: 4.4.0

* Allow `backdrop` options of `true` and `false` to dismiss modals
* Pass dialog as `this` value in callbacks
* Bootstrap 3.3.2 compatibility
* jQuery 1.11.2 compatibility
* Add support for `maxlength` prompt input attribute
* Gracefully detect lack of Bootstrap library rather than crashing
* Expose `addLocale` and `removeLocale` for custom locale settings
* Expose `setLocale` helper to select a locale rather than using `setDefaults("locale", ...)`
* Add Hungarian locale
* Add Croatian locale
* Add Bulgarian locale
* Add Thai locale
* Add Persian locale
* Add Albanian locale

For a full list of releases and changes please see [the changelog](https://github.com/makeusabrew/bootbox/blob/master/CHANGELOG.md).

## License

(The MIT License)

Copyright (C) 2011-2018 by Nick Payne <nick@kurai.co.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE
