'use strict'
const adjustIndex = require('./adjust-index')
const and = require('./and')
const arrayify = require('./arrayify')
const curry = require('./curry')
const decr = require('./decr')
const eq = require('./eq')
const head = require('./head')
const isEmpty = require('./is-empty')
const len = require('./len')
const map = require('./map')
const mapcat = require('./mapcat')
const max = require('./max')
const min = require('./min')
const notArr = require('./not-arr')
const notStr = require('./not-str')
const or = require('./or')
const partitionAt = require('./partition-at')
const sub = require('./sub')
const tail = require('./tail')

function swap(i, j, xs) {
  if (and(notArr(xs), notStr(xs)))
    throw new TypeError('[swap] Last argument must be an array or a string')

  const [k, n] = map(adjustIndex(0, decr(len(xs)), xs), [i, j])

  if (or(isEmpty(xs), eq(k, n)))
    return xs

  const [hd, rest] = partitionAt(min(k, n), xs)
  const [md, tl] = partitionAt(sub(max(k, n), len(hd)), rest)

  return mapcat(arrayify, [hd, head(tl), tail(md), head(md), tail(tl)])
}

module.exports = curry(swap)
