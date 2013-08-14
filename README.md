# Bootbox - Twitter Bootstrap powered alert, confirm and flexible dialog boxes

Please see http://bootboxjs.com for full usage instructions, or head over to http://paynedigital.com/bootbox for
the original writeup about the project.

## Bootstrap 3 support

[Bootstrap 3 RC1](http://getbootstrap.com/) is now available meaning that as per the
[roadmap](https://github.com/makeusabrew/bootbox/blob/v3.x/README.md#roadmap)
the next major release of Bootbox will be 4.0.0. This will entail a complete rewrite and new
public API and will be out as close to the full Bootstrap 3.0 release as possible. If you wish
to contribute to its development, please ensure you're working on the
[master](https://github.com/makeusabrew/bootbox/tree/master) branch. If you want to
contribute bugfixes to the Bootbox 3.x series (which depend on Bootstrap 2.x) please work on the
[v3.x]([master](https://github.com/makeusabrew/bootbox/tree/v3.x) branch.

If you just want to download a version of the library compatible with the Bootstrap 2.x series, please
see the [list of available releases](https://github.com/makeusabrew/bootbox/releases).

## Contact

The easiest thing is to [find me on twitter @makeusabrew](http://twitter.com/makeusabrew)

## Contributing

Please see the [CONTRIBUTING](https://github.com/makeusabrew/bootbox/blob/master/CONTRIBUTING.md) file for guidelines.

## Running Tests [![Build Status](https://api.travis-ci.org/makeusabrew/bootbox.png)](http://travis-ci.org/makeusabrew/bootbox)

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

Keeping track of issues has become increasingly difficult without a **strict**
dependency on specific minor versions of Bootstrap. The original intention was
that the 2.x.x series of Bootbox would simply require Bootstrap >= 2.x.x - since
both projects use Semantic Versioning this should have been possible. However,
Bootstrap 2.2.x (and possibly 2.1.x) introduced breaking changes - or at least
changes considered backward incompatible in the context of this project. Over
time bugs started getting raised which eventually turned out to be due to subtle
changes in Bootstrap's code. Therefore, **2.5.1** was the last release which will
support Bootstrap 2.0.x and is **not guaranteed** to work with anything higher than
Bootstrap 2.0.4.

Bootbox *3.0.0* is the first release to support Bootstrap 2.2.x. More about this [on the Bootbox website](http://bootboxjs.com/#dependencies).

### Roadmap

The next major release of Bootbox - 4.0.0 - will involve a complete rewrite of the
internal code and introduce an entirely new public API. It will most likely require
Bootstrap 3.0.0 (assuming that sees the light of day first).

You can get a quick overview of the roadmap in the form of the project milestones
[as listed in the issue tracker](https://github.com/makeusabrew/bootbox/issues/milestones?direction=asc&sort=due_date).

## Latest Release: 3.3.0

* Add Polish translation (GH-93)
* Add Danish translation (GH-96)
* Pass event object to custom callbacks (GH-103)
* Add Chinese (Taiwan / China) translations (GH-106)
* Make prompt input block-level (GH-111)
* Add link: true option to prevent btn class from being applied (GH-114)
* Prevent child elements triggering hidden callback (GH-115)
* Replace Phing with Grunt
* Replace Closure compiler with UglifyJS

For a full list of releases and changes please see [the changelog](https://github.com/makeusabrew/bootbox/blob/master/CHANGELOG.md).

## License

(The MIT License)

Copyright (C) 2011-2013 by Nick Payne <nick@kurai.co.uk> 

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
