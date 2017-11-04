module.exports = function (func, arg) {
  var value = func(arg)

  while (typeof value === 'function') {
    value = value()
  }

  return value
}
