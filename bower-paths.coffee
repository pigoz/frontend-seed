Q         = require 'q'
P         = require 'path'
bower     = require 'bower'
sassPaths = []
shim      = {}

extractPaths = (paths, regex) ->
  paths = [paths] unless Array.isArray(paths)
  path for path in paths when regex.test(path)

bowerToSassPaths = (bowerPkgs) ->
  sassPaths =
    for _pkg, paths of bowerPkgs
      for path in extractPaths(paths, /\.(css|scss)$/)
        sassPaths.unshift(P.dirname(path))

bowerToBrowserifyShim = (bowerPkgs) ->
  for pkg, paths of bowerPkgs
    for path in extractPaths(paths, /\.(js|coffee)$/)
      shim[pkg] = { path: path, exports: pkg}

load = ->
  deferred = Q.defer()
  bower.commands.list(paths: true).on 'end', (result) ->
    bowerToSassPaths(result)
    bowerToBrowserifyShim(result)
    deferred.resolve()
  deferred.promise

exports = module.exports =
  browserify:
    shim: shim

  sass:
    paths: sassPaths

  load: load
