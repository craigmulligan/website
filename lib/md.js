const Promise = require('bluebird')
const Remark = Promise.promisifyAll(require('remark'))
const html = require('remark-html')
const highlight = require('remark-highlight.js')
const remark = Remark()
  .use(highlight)
  .use(html)
const md = Promise.promisify(remark.process)

module.exports = md
