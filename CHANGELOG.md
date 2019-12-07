## 5.4.0 (Latest Release)

- Adds function hooks for `onShow`, `onShown`, `onHide`, and `onHidden` events, which map to their Bootstrap modal equivalents.

### 5.3.4

- Removes `':first'` selector from default button binding

### 5.3.3

- Fixes incorrect value validation for the `step` option when setting `inputType` to `number` for a prompt.

### 5.3.2

- Adds Georgian (ka) locale.

### 5.3.0

- Moves development (unminified) versions of Bootbox files back to repository root (to simplify getting CDNjs updated).

### 5.2.0

- Modifies dialog to only process button callback if it has been defined; see https://github.com/makeusabrew/bootbox/issues/705

### 5.1.3

- Adds Swahili (sw) locale.

### 5.1.2

- Adds `bootbox.all.js` to `src` directory as a temporary work-around for incorrectly-built concatenated file

### 5.1.1

- Adds `rows` as a prompt option when setting `inputType` to `textarea`.

### 5.1.0

- Adds `scrollable` option, which enables the scrollable modal content added in Bootstrap 4.3
- Adds `extra-large` as a size option
- Adds aliased/alternative keys for all size options: `sm`, `lg`, `xl`

### 5.0.1

- Adds Tamil (ta) locale

### 5.0.0

- Updates Bootbox to be compatible with both Bootstrap 4 and Bootstrap 3.
- Pulls button locale options to separate file
- Corrects Russion locale
- Changes default button trigger to target the button with the `bootbox-accept` class; this corrects instances where no button has the `btn-primary` class.
- Various bugfixes

#### Prompt

- Refactors prompt function to use the same dialog factory as alert and confirm
- Adds new input types for prompt:
  - `radio`
  - `range`
- Adds prompt input constraints for `min`, `max`, `step`, `maxlength`, `pattern`, and `required`
- Adds `pattern` option for prompt inputs
- Allows `message` option for prompt
- Allows `multiple` option for prompt when used with `inputType` set to `select`

#### Dialog options

- Adds `locale` option - allows locale to be set on a dialog-by-dialog basis
- Adds `swapButtonOrder` option to allow reversing the default button order
- Adds `centerVertical` option - adds support for vertically-centered dialogs (requires Bootstrap 4)

## 4.4.0

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

### 4.3.0

* Add `size` option (`large`, `small`)
* Stop propagation on form submit
* Return bootbox object from `hideAll`
* Add Portuguese locale
* Add Czech locale
* Add Greek locale
* Add Estonian locale
* Add Indonesian locale
* Add Japanese locale

### 4.2.0

* Add Swedish locale
* Add Latvian locale
* Add Turkish locale
* Add Hebrew locale
* Add password input type
* Add textarea input type
* Add date input type
* Add time input type
* Add number input type
* Support DOM selectors for container argument
* UMD support
* Better support on mobile devices

### 4.1.0

* Add support for placeholder attribute in prompts
* Add select, email and checkbox types for prompts (thanks [@tarlepp](https://github.com/tarlepp))
* Add Norwegian locale
* Allow setDefaults to take two key/val arguments
* Add unique classes for main dialog methods
* Create bower package

### 4.0.0

* Bootstrap 3.0.0 compatibility
* Complete rewrite (and new public API)
* Use strict mode
* Add close buttons to wrapper methods (GH-92)
* Allow dialog titles to be specified (GH-51, GH-112)
* Allow optional extra class on dialog wrapper (GH-116)
* Fix ```backdrop: true``` not firing close handler (GH-77)
* Replace various configuration methods with one ```setDefaults```

## 3.3.0

* Add Polish translation (GH-93)
* Add Danish translation (GH-96)
* Pass event object to custom callbacks (GH-103)
* Add Chinese (Taiwan / China) translations (GH-106)
* Make prompt input block-level (GH-111)
* Add link: true option to prevent btn class from being applied (GH-114)
* Prevent child elements triggering hidden callback (GH-115)
* Replace Phing with Grunt
* Replace Closure compiler with UglifyJS

### 3.2.0

* ensure ```onEscape``` handlers return callback values properly (GH-91)
* ensure clicking close button invokes onEscape handler if present

### 3.1.0

* ensure ```confirm``` and ```prompt``` methods return callback values properly (GH-90)
* address various jshint warnings (GH-79)
* add ```setBtnClasses``` method for custom standard button classes (GH-87)

### 3.0.0

* bump Bootstrap dependency to 2.2.2
* bump jQuery dependency to 1.8.3
* ensure callbacks are always invoked even if dialogs are dismissed with escape key (GH-49)
* fix button positions with Bootstrap 2.2.2 (GH-58)
* stop multiple dialogs crashing browsers (GH-60, GH-64)
* ensure ```shown``` event is fired properly even when animation is disabled (GH-69)
* use ```.on``` instead of ```.bind```
* commentify code a bit more

## 2.5.1

**This was the last version of the library to support Bootstrap 2.0.x**

* ensure bootbox object is explicitly added to window object for minfier visibility

### 2.5.0

* add option to specify proper href attributes for buttons instead of callbacks (@StevePotter)
* add option to override per-modal classes (@ciaranj)

### 2.4.2

* revert ```backdrop``` default value to 'static' instead of ```true``` to prevent background clicks dismissing dialogs (GH-55)

### 2.4.1

* fix ```backdrop``` when supplied as an argument to ```bootbox.dialog```
* fix incorrect README version

### 2.4.0

* add ```bootbox.backdrop(bool)``` method (@gucki)
* add default parameter option to ```bootbox.prompt``` (@pzgz)

### 2.3.3

* add inline ```overflow: hidden``` CSS property (GH-46)
* move license info to separate hosted file to reduce file size

### 2.3.2

* Change button href attributes to ```javascript:;``` (@joshnesbitt)
* Explicitly ```window.jQuery``` through to ```Bootbox``` object (@nuegon)


### 2.3.1

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

## 1.1.2

* Added licensing information to README

#### 1.1.1
* Updated german locale

#### 1.1.0
* Secondary option of two-button dialog no longer has 'danger' class
* New bootbox.modal() method for generic non-dialog popups
* Allow jQuery objects to be passed as main dialog argument
