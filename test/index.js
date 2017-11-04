const { tco, trampoline } = require('../src')

const sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  } else {
    return x
  }
})

console.log( sum(1, 100000) ) // => 100001

function isEvenInner (num) {
  if (num === 0) {
    return true
  }

  if (num === 1) {
    return false
  }

  return function() {
    return isEvenInner(Math.abs(num) - 2)
  }
}

console.log( trampoline(isEvenInner, 99999) )
// => false

console.log( trampoline(isEvenInner, 99998) )
// => true

const isEven = trampoline.bind(null, isEvenInner)

console.log( isEven(99999) )
// => false


function factorial (n) {
  function recur (n, acc) {
    if (n === 0) {
      return acc
    } else {
      return recur.bind(null, n-1, n*acc)
    }
  }
  return function () {
    return recur.bind(null, n, 1)
  }
}

console.log( trampoline(factorial(100000)) )
// => Infinity

function _even (n) {
  if (n === 0) {
    return true
  } else {
    return _odd.bind(null, n-1)
  }
}

function _odd (n) {
  if (n === 0) {
    return false
  } else {
    return _even.bind(null, n-1)
  }
}

function even (n) {
  return trampoline(_even.bind(null, n))
}

function odd (n) {
  return trampoline(_odd.bind(null, n))
}

console.log(
  even(99999),
  odd(99999),
  even(99998),
  odd(99998)
)
// false true true false
