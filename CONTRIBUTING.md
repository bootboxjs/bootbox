# IMPORTANT: Bootstrap 3 support

[Bootstrap 3 RC1](http://getbootstrap.com/) is now available meaning that as per the
[roadmap](https://github.com/makeusabrew/bootbox/blob/v3.x/README.md#roadmap)
the next major release of Bootbox will be 4.0.0. This will entail a complete rewrite and new
public API and will be out as close to the full Bootstrap 3.0 release as possible. If you wish
to contribute to its development, please ensure you're working on the
[master](https://github.com/makeusabrew/bootbox/tree/master) branch. If you want to
contribute bugfixes to the Bootbox 3.x series (which depend on Bootstrap 2.x) please work on the
[v3.x]([master](https://github.com/makeusabrew/bootbox/tree/v3.x) branch. A
[gist](https://gist.github.com/makeusabrew/6223814) is available as a sketchpad for v4.x ideas.

## Submitting Pull Requests

* run ```npm install``` to make sure your development dependencies are up-to-date
* Please ensure that the test suite passes before submitting a PR:
 * ```npm test```
* If you've added new functionality, **please** include tests which validate its behaviour
* Please ensure that bootbox.js is lint free:
 * ```grunt jshint```

## Submitting bug reports

* Where at all possible, please try and provide a link to a jsfiddle.net example or similar
* Please detail the affected browser(s) and operating system(s)
* Please be sure to state which version of Bootbox **and** Bootstrap you're using
