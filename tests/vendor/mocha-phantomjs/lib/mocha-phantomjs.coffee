system  = require 'system'
webpage = require 'webpage'

USAGE = """
        Usage: phantomjs mocha-phantomjs.coffee URL REPORTER
        """

class Reporter

  constructor: (@reporter) ->
    @url = system.args[1]
    @columns = parseInt(system.env.COLUMNS or 75) * .75 | 0
    @mochaStarted = false
    @mochaStartWait = 6000
    @fail(USAGE) unless @url

  run: ->
    @initPage()
    @loadPage()

  # Subclass Hooks

  customizeRunner: (options) ->
    undefined

  customizeProcessStdout: (options) ->
    undefined

  customizeConsole: (options) ->
    undefined

  customizeOptions: ->
    columns: @columns

  # Private

  fail: (msg) ->
    console.log msg if msg
    phantom.exit 1

  finish: ->
    phantom.exit @page.evaluate -> mochaPhantomJS.failures

  initPage: ->
    @page = webpage.create()
    @page.onConsoleMessage = (msg) -> console.log msg
    @page.onInitialized = =>
      @page.evaluate ->
        window.mochaPhantomJS =
          failures: 0
          ended: false
          started: false
          run: ->
            mochaPhantomJS.started = true

  loadPage: ->
    @page.open @url
    @page.onLoadFinished = (status) =>
      if status isnt 'success' then @onLoadFailed() else @onLoadSuccess()

  onLoadSuccess: ->
    @injectJS()
    @waitForRunMocha()

  onLoadFailed: ->
    @fail "Failed to load the page. Check the url: #{@url}"

  injectJS: ->
    if @page.evaluate(-> window.mocha?)
      @page.injectJs 'mocha-phantomjs/core_extensions.js'
      @page.evaluate @customizeProcessStdout, @customizeOptions()
      @page.evaluate @customizeConsole, @customizeOptions()
    else
      @fail "Failed to find mocha on the page."

  runMocha: ->
    @page.evaluate @runner, @reporter
    @mochaStarted = @page.evaluate -> mochaPhantomJS.runner or false
    if @mochaStarted
      @mochaRunAt = new Date().getTime()
      @page.evaluate @customizeRunner, @customizeOptions()
      @waitForMocha()
    else
      @fail "Failed to start mocha."

  waitForMocha: =>
    ended = @page.evaluate -> mochaPhantomJS.ended
    if ended then @finish() else setTimeout @waitForMocha, 100

  waitForRunMocha: =>
    started = @page.evaluate -> mochaPhantomJS.started
    if started then @runMocha() else setTimeout @waitForRunMocha, 100

  runner: (reporter) ->
    try
      mocha.setup reporter: reporter
      mochaPhantomJS.runner = mocha.run()
      if mochaPhantomJS.runner
        mochaPhantomJS.runner.on 'end', ->
          mochaPhantomJS.failures = @failures
          mochaPhantomJS.ended = true
    catch error
      false

class Spec extends Reporter

  constructor: ->
    super 'spec'

  customizeProcessStdout: (options) ->
    process.stdout.write = (string) ->
      return if string is process.cursor.deleteLine or string is process.cursor.beginningOfLine
      console.log string

  customizeConsole: (options) ->
    process.cursor.CRMatcher = /\s+◦\s\w/
    process.cursor.CRCleaner = process.cursor.up + process.cursor.deleteLine
    origLog = console.log
    console.log = ->
      string = console.format.apply(console, arguments)
      if string.match(process.cursor.CRMatcher)
        process.cursor.CRCleanup = true
      else if process.cursor.CRCleanup
        string = process.cursor.CRCleaner + string
        process.cursor.CRCleanup = false
      origLog.call console, string

class Dot extends Reporter

  constructor: ->
    super 'dot'

  customizeProcessStdout: (options) ->
    process.cursor.margin = 2
    process.cursor.CRMatcher = /\u001b\[\d\dm\․\u001b\[0m/
    process.stdout.columns = options.columns
    process.stdout.allowedFirstNewLine = false
    process.stdout.write = (string) ->
      if string is '\n  '
        unless process.stdout.allowedFirstNewLine
          process.stdout.allowedFirstNewLine = true
        else
          return
      else if string.match(process.cursor.CRMatcher)
        if process.cursor.count is process.stdout.columns
          process.cursor.count = 0
          forward = process.cursor.margin
          string = process.cursor.forwardN(forward) + string
        else
          forward = process.cursor.margin + process.cursor.count
          string = process.cursor.up + process.cursor.forwardN(forward) + string
        ++process.cursor.count
      console.log string

class Tap extends Reporter

  constructor: ->
    super 'tap'

class List extends Reporter

  constructor: ->
    super 'list'

  customizeProcessStdout: (options) ->
    process.stdout.write = (string) ->
      return if string is process.cursor.deleteLine or string is process.cursor.beginningOfLine
      console.log string

  customizeProcessStdout: (options) ->
    process.cursor.CRMatcher = /\u001b\[90m.*:\s\u001b\[0m/
    process.cursor.CRCleaner = (string) -> process.cursor.up + process.cursor.deleteLine + string + process.cursor.up + process.cursor.up
    origLog = console.log
    console.log = ->
      string = console.format.apply(console, arguments)
      if string.match /\u001b\[32m\s\s-\u001b\[0m/
        string = string
        process.cursor.CRCleanup = false
      if string.match(process.cursor.CRMatcher)
        process.cursor.CRCleanup = true
      else if process.cursor.CRCleanup
        string = process.cursor.CRCleaner(string)
        process.cursor.CRCleanup = false
      origLog.call console, string

class Min extends Reporter

  constructor: -> super 'min'

class Doc extends Reporter

  constructor: -> super 'doc'

class Teamcity extends Reporter

  constructor: -> super 'teamcity'

class Json extends Reporter

  constructor: -> super 'json'

class JsonCov extends Reporter

  constructor: -> super 'json-cov'

class HtmlCov extends Reporter

  constructor: -> super 'html-cov'


reporterString = system.args[2] || 'spec'
reporterString = ("#{s.charAt(0).toUpperCase()}#{s.slice(1)}" for s in reporterString.split('-')).join('')
reporterKlass  = try
                   eval(reporterString)
                 catch error
                   undefined

if reporterKlass
  reporter = new reporterKlass
  reporter.run()
else
  console.log "Reporter class not implemented: #{reporterString}"
  phantom.exit 1


