'use strict'

/*
 *   vars
 */

// data files
const settings = require('../settings.json')

/*
 * functions
 */

function handleTitle (message) {
  var title = ''
  if (message.embed.title !== undefined) {
    title = '**' + message.embed.title + '**\n'
  }
  return title
}

function handleDescription (message) {
  return message.embed.description !== undefined
    ? message.embed.description + '\n\n'
    : '\n'
}

function handleBody (message, headersImportant) {
  var body = ''
  if (message.embed.fields !== undefined) {
    message.embed.fields.forEach(function (field) {
      var fieldString = ''

      if (headersImportant) {
        fieldString += '**' + field.name + '**\n'
      }

      body += fieldString + field.value + '\n'
    })
  }
  return body
}

function output (message, headersImportant = true) {
  return settings.embeds.active
    ? message
    : exports.strip(message, headersImportant)
}

/*
 *  exports
 */

exports.send = function (channel, message, headersImportant = true) {
  return channel.send(output(message, headersImportant))
}

exports.strip = function (message, headersImportant = true) {
  return handleTitle(message) + handleDescription(message) + handleBody(message, headersImportant)
}
