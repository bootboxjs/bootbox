## Submitting Pull Requests

**Please follow these basic steps to simplify pull request reviews - if you don't you'll probably just be asked to anyway.**

* Please rebase your branch against the current master
* Run ```npm install``` to make sure your development dependencies are up-to-date
* [grunt-cli](https://github.com/gruntjs/grunt-cli) >= 0.4.0 is required to sanity check your contribution
* Please ensure that the test suite passes **and** that bootbox.js is lint free before submitting a PR by running:
 * ```grunt```
* If you've added new functionality, **please** include tests which validate its behaviour

## Submitting bug reports

* Where at all possible, please try and provide a link to a jsfiddle.net example or similar
* Please detail the affected browser(s) and operating system(s)
* Please be sure to state which version of Bootbox, jQuery **and** Bootstrap you're using
