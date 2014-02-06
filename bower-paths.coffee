Q         = require 'q'
bower     = require 'bower'
shim      = {}

load = ->
  deferred = Q.defer()
  bower.commands.list(paths: true).on 'end', (result) ->
    for pkg, path of result
      shim[pkg] = { path: path, exports: pkg }
    deferred.resolve()
  deferred.promise

exports = module.exports =
  browserify:
    shim: shim

  load: load
