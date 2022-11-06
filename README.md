# Bootbox - Bootstrap powered alert, confirm and flexible dialog boxes

Please see http://bootboxjs.com for full usage instructions, or head over to http://paynedigital.com/bootbox for
the original writeup about the project.

## Contact

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/makeusabrew/bootbox?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

The easiest thing is to [find me on twitter @makeusabrew](http://twitter.com/makeusabrew).

## Contributing

Please see the [CONTRIBUTING](https://github.com/makeusabrew/bootbox/blob/master/CONTRIBUTING.md) file for guidelines.

## Running Tests

Tests are run using [Karma](http://karma-runner.github.io/0.8/index.html) using the Mocha test adapter. To run the tests yourself, simply run 

```
npm install
``` 

within the project followed by 

```
npm test
```

When submitting pull requests, ensure your tests pass. **Pull-requests with failing tests will be rejected.** See the
[CONTRIBUTING](https://github.com/makeusabrew/bootbox/blob/master/CONTRIBUTING.md) file for more information.

## A note on Bootstrap dependencies

Bootbox **6.0.0** is the first release to support Bootstrap 5.0.0.

Bootbox **5.0.0** is the first release to support Bootstrap 4.0.0.

Bootbox **4.0.0** is the first release to support Bootstrap 3.0.0.

Bootbox **3.3.0** is the *last* release to support Bootstrap 2.2.x.

Much more dependency information can be found [on the Bootbox website](http://bootboxjs.com/getting-started.html#bootbox-dependencies).

## 6.0.0 (Latest Release)

- Removes various IE polyfills
- Replaces `var` with `let`
- JSDoc cleanup
- Adds code to handle cases when click starts on the modal body and ends on the backdrop and `backdrop` is set to `true`
- `bootbox.locale.js` and `bootbox.all.js` are now generated files and will be found in the `/dist` directory
- Simplify locale file structure
- Changed a few locale identifiers to match IANA specifications:
  - `bg_BG` -> `bg-BG`
  - `pt-br` -> `pt-BR`
  - `zh_CN` -> `zh-CN`
  - `zh_TW` -> `zh-CW`

For a full list of releases and changes please see [the changelog](https://github.com/makeusabrew/bootbox/blob/master/CHANGELOG.md).

## License

(The MIT License)

Copyright (C) 2011-2022 by Nick Payne <nick@kurai.co.uk>

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
