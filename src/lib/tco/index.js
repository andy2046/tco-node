module.exports = function (f) {
  var value
  var active = false
  var accumulated = []

  return function accumulator () {
    accumulated.push(arguments)

    if (!active) {
      active = true

      while (accumulated.length) {
        value = f.apply(this, accumulated.shift())
      }

      active = false

      return value
    }
  }
}
