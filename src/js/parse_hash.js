'use strict'

// TODO: import { modCharacter } from logic.js
// TODO: import { clearCharacter } from layers.js
// TODO: import { currentUser } from login.js
// TODO: import { selectMale, selectFemale } from main.js

/*
// FIXME: extracking hash() from lib/hash.min.js
;(function (a, b) {
  var c = (function () {
    var b = function () {
      var b = a.location.hash ? a.location.hash.substr(1).split('&') : []; var c = {}; for (var d = 0; d < b.length; d++) { var e = b[d].split('='); c[e[0]] = decodeURIComponent(e[1]) } return c
    }
    var c = function (b) {
      var c = []
      for (var d in b) {
        c.push(d + '=' + encodeURIComponent(b[d]))
      }
      a.location.hash = c.join('&')
    }
    return {
      get: function (a) {
        var c = b(); if (a) { return c[a] } else { return c }
      },
      add: function (a) {
        var d = b(); for (var e in a) { d[e] = a[e] }c(d)
      },
      remove: function (a) {
        a = typeof a === 'string' ? [a] : a; var d = b(); for (var e = 0; e < a.length; e++) { delete d[a[e]] }c(d)
      },
      clear: function () { c({}) }
    }
  }())
  a.hash = c
})(window)
*/

function parseHash (c, forms, skinLayers, hairLayers) {
// export function parseHash (c, forms, skinLayers, hairLayers) {
  newParseHash()
  var formsLength = forms.length
  var formsCounter = formsLength
  var hashColor
  var hashColorBeta
  var hashColorGamma
  var hashColorDelta
  var hashColorEpsilon
  var hashData

  while (formsCounter--) {
    var f = formsLength - formsCounter - 1
    for (var x in forms[f]) {
      var section = x.toLowerCase()
      if (section === 'pupils') {
        // FIXME: import...
        window.modCharacter(section, hashData)
      }
      if (section === 'brows' || section === 'eyes' || section === 'mouth' || section === 'lashes' || section === 'sockets') {
        hashData = window.hash.get('emotion')
        if (hashData === undefined) {
          hashData = 'neutral'
        }
      } else {
        hashData = window.hash.get(section)
      }
      var id = section + '_' + hashData
      if (hashData !== undefined) {
        // FIXME: import...
        window.modCharacter(section, hashData)
        // ga('send', 'event', 'hash', 'select', id);
      } else if (section === 'brows' || section === 'eyes' || section === 'mouth' || section === 'lashes' || section === 'sockets') {
        // FIXME: import...
        window.modCharacter(section, 'neutral')
      };
      if (id in skinLayers || section === 'body') {
        section = 'skin'
      } else if (id in hairLayers || section === 'hair') { section = 'hair' }

      hashColor = window.hash.get(section + 'Color')
      hashColorBeta = window.hash.get(section + 'Color-bet')
      hashColorGamma = window.hash.get(section + 'Color-gam')
      hashColorDelta = window.hash.get(section + 'Color-del')
      hashColorEpsilon = window.hash.get(section + 'Color-eps')

      // FIXME: !hashColor?
      if (hashColor !== undefined && hashColor !== '') {
        // FIXME: import...
        window.modCharacter(section + 'Color', hashColor)
        // ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
      }

      // FIXME: !hashColorBeta?
      if (hashColorBeta !== undefined && hashColorBeta !== '') {
        // FIXME: import...
        window.modCharacter(section + 'Color-bet', hashColorBeta)
        // ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
      }

      // FIXME: !hashColorGamma?

      if (hashColorGamma !== undefined && hashColorGamma !== '') {
        // FIXME: import...
        window.modCharacter(section + 'Color-gam', hashColorGamma)
        // ga('send', 'event', 'hash', 'color', section+'_'+hashColor )
      }

      // FIXME: !hashColorDelta?
      if (hashColorDelta !== undefined && hashColorDelta !== '') {
        // FIXME: import...
        window.modCharacter(section + 'Color-del', hashColorDelta)
        // ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
      }

      // FIXME: !hashColorEpsilon?
      if (hashColorEpsilon !== undefined && hashColorEpsilon !== '') {
        // FIXME: import...
        window.modCharacter(section + 'Color-eps', hashColorEpsilon)
        // ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
      }
    }
  }
}

function newParseHash () {
  var hashDict = window.hash.get()
  // var keys = Object.keys(hashDict)
  var key
  for (key in hashDict) {
    if (hashDict[key] === '') { window.hash.remove(key) }
  }
  if (hashDict.irisColor !== '') {
    // FIXME: import...
    window.modCharacter('irisColor', hashDict.irisColor)
  }
}

function hashCharacter () {
// export function hashCharacter () {
  // FIXME: import...
  var u = window.currentUser.cc.personnages[window.currentUser.cc.personnageActuel]
  var r
  var t = []
  for (r in u) {
    t.push(encodeURIComponent(r) + '=' + encodeURIComponent(u[r]))
  }
  if (t.length) {
    // FIXME: import...
    personnageActuelToHash(window.currentUser)
  }
}

function personnageActuelToHash (currentUser) {
  var personnageActuel = currentUser.cc.personnageActuel
  var personnageActuelData
  var itemsList
  // var itemsCounter
  var currentCount
  var myKey
  var myValue
  var hashArgs = {}

  if (personnageActuel && personnageActuel !== '') {
    personnageActuelData = currentUser.cc.personnages[personnageActuel]
    itemsList = Object.keys(personnageActuelData)
    var itemsListLength = itemsList.length
    var itemsListCounter = itemsListLength
    while (itemsListCounter--) {
      currentCount = itemsListLength - itemsListCounter - 1
      myKey = itemsList[currentCount]
      myValue = personnageActuelData[itemsList[currentCount]]
      hashArgs[myKey] = myValue
      window.hash.add(hashArgs)
    }
    // FIXME: import...
    window.clearCharacter()
    interpretHash()
  } else {

  }
}

function interpretHash () {
// export function interpretHash () {
  var hashSex = window.hash.get('sex')
  if (hashSex === 'm') {
    // FIXME: import...
    window.selectMale()
  } else if (hashSex === 'f') {
    // FIXME: import...
    window.selectFemale()
  }
}
