'use strict'
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')

function error (value) {
  value = value || undefined
  console.error(`[error] ${value}`)
  process.exit(1)
}

function resolveInput (value) {
  if (!fs.existsSync(value)) error('Input not exist.')
  if (fs.lstatSync(value).isFile()) error('Input should be a folder.')
  return path.resolve(value, `**/*`)
}

function resolveOutput (input, output) {
  if (!output) return path.dirname(path.dirname(input))
  return path.resolve(output)
}

function imgcompile (input, output) {
  input = resolveInput(input)
  output = resolveOutput(input, output)

  return new Promise((resolve, reject) => {
    try {
      gulp
        .src(input)
        .pipe(imagemin())
        .pipe(gulp.dest(output))
      console.info(`[info] Optimized Complete, saving file...`)
      console.info(`[info] Wrote IMG's to ${output}`)
      resolve(output)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = imgcompile
