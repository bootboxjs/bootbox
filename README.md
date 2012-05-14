# Bootbox - Twitter Bootstrap powered alert, confirm and flexible dialog boxes

Please see http://paynedigital.com/bootbox for full usage instructions, or head over to http://bootboxjs.com for
a demo page.

## Contact

The easiest thing is to [find me on twitter](http://twitter.com/makeusabrew) [@makeusabrew](http://twitter.com/makeusabrew)

## Demo

The [gh-pages](https://github.com/makeusabrew/bootbox/tree/gh-pages) branch contains a
very [crude demo](http://bootboxjs.com/) (feel free to fork and improve!).

## Versioning

[SemVer](http://semver.org/) has now been adopted as of 1.0.0

### Latest Release: 2.3.1

* Ensure bootbox.prompt() gives focus to input, disable input autocomplete

### 2.3.0

* Added bootbox.prompt() to mimic native prompt() method
* Added Russian locale (#27)

### 2.2.0

* Allowed button callbacks to explicitly return false to prevent dialog from closing (thanks @benoit-ponsero)
* Added version number to header comments (#26)

### 2.1.2

* Added close button to re-scoped click handler (thanks @SeanMcGee and @kentbrew)

### 2.1.1

* Fixed incorrect button click handler selector (thanks FGRibreau)

### 2.1.0

* Added support for Bootstrap's Glyphicons via the ```icon``` option
* Added inline license information into bootbox.js and bootbox.min.js
* Tidied up source a little

### 2.0.1

* Removed dummy Google Closure Compiler method from minified library (thanks j0k3r!)

### 2.0.0

* Updated Bootstrap dependency from 1.4 to 2.0
* Class definitions now require ```btn-``` prefix as per Bootstrap 2.0
* Added Brazilian locale
* Added ```animate``` dialog option
* Added ```bootbox.animate(bool)``` option to set default animation preference
* Animated dialogs now rely on ```bootstrap-transitions.js``` as required by Bootstrap 2.0

### 1.1.2

* Added licensing information to README

#### 1.1.1
* Updated german locale

#### 1.1.0
* Secondary option of two-button dialog no longer has 'danger' class
* New bootbox.modal() method for generic non-dialog popups
* Allow jQuery objects to be passed as main dialog argument

## License

(The MIT License)

Copyright (C) 2011-2012 by Nick Payne <nick@kurai.co.uk> 

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
