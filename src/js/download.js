// TODO: import { purgeHiddenLayers } from layers.js
// TODO: import { caboose } from main.js

function getDownloadViewBox () {
  var viewBoxValue
  var cameraViewContainer = document.querySelector('.camera-view input:checked + label svg')
  if (cameraViewContainer) {
    viewBoxValue = cameraViewContainer.getAttribute('viewBox')
  } else {
    viewBoxValue = '10 10 540 540'
  }
  return viewBoxValue
}

function getSVG () {
  // TODO Get viewBox from radio input and add it bellow
  var viewBoxValue = getDownloadViewBox()
  var text = '<!-- ?xml version="1.0" encoding="UTF-8" standalone="no"? -->\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  id="character" width="560" height="560" viewBox="' + viewBoxValue + '">\n'
  var svgRaw = document.getElementById('svg1').childNodes
  var svgNodes
  var svgString
  // var event

  window.purgeHiddenLayers()

  // This previous version of the text contains all svg files shown and hidden
  // It will need to be filtered to keep only the layers needed for our purpose

  /*
  FIXME: filename isn't actually used here or after
  if (window.currentUser && window.currentUser.cc.personnageActuel !== '') {
    filename = window.currentUser.cc.personnageActuel + '.svg'
  }
  */

  svgNodes = Array.prototype.slice.call(svgRaw)

  svgNodes.forEach(function (item) {
    if (item.innerHTML !== undefined) {
      // This removes only useless layers and allows us to o the next test.
      if (!item.style || !item.style.opacity || item.style.opacity !== '0') {
        svgString = '<g id="' + item.id + '">' + item.innerHTML + '</g>'
        text += svgString
      // } else {
      }
    }
  })

  text += '</svg>'
  return text
}

export function download (ev) {
  ev.preventDefault()

  // FIXME: if ga() doesn't exist because an adblocker, make sure we have a stub (NOP) for it.
  window.ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Download', eventLabel: 'Download SVG file of character' })
  // TODO make the filename the character's name if possible.
  var filename = window.c.choices.name || 'my_character.svg'
  var pom
  var text = getSVG()
  // TODO Copy the URL before it is erased by the download function.

  pom = document.createElement('a')
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  pom.setAttribute('download', filename)

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    pom.dispatchEvent(event)
  } else {
    pom.click()
  }
  window.caboose()
}
