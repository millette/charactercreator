// TODO: import { zoomFull } from zoom.js
// TODO: import { clearCharacter } from layers.js
// TODO: import { interpretHash } from parse_hash.js
// TODO: import { hideSidebarLeft, hideSidebarRight, clearSidebarLeft, clearSidebarRight, showSidebarLeft } from sidebars.js
// TODO: import { createForm, getSectionLayersList } from form.js
// TODO: import { capitalizeFirstLetter } from helper.js
// TODO: import { getMultiLayer } from main.js
// TODO: import { triggerSaveBtn } from login.js
// TODO: import { changeClipPathOnEyes } from clippaths.js

// Change sex of character from male to female or vice versa.
export function trans (sex) {
  if (window.c.choices.sex === sex) { return }
  var characterSVG = document.querySelector('#svg1 .character-container')
  characterSVG.classList.add('character--hide')
  window.hash.add({ sex: sex })
  window.hash.add({ emotion: 'neutral' }) // Female and Male templates have different set of emotions at this time.
  // ^ Should really check to see if the emotion doesn't exist before forcing a change to neutral.
  if (window.currentUser && window.currentUser.cc && window.currentUser.cc.personnages && window.currentUser.personnageActuel) {
    window.currentUser.cc.personnages[window.personnageActuel].sex = sex
  }
  window.sex = sex
  buildCharacter(resetForms)
}

// TODO change setTimeout to promises.
function buildCharacter (callback) {
  var characterSVG = document.querySelector('#svg1')
  setTimeout(function () {
    window.zoomFull()
    clearForms()
    window.clearCharacter()
    window.interpretHash()
    setTimeout(function () {
      characterSVG.classList.remove('character--hide')
      callback()
    }, 500)
  }, 500)
}

function hideForms () {
  window.hideSidebarLeft()
  window.hideSidebarRight()
}

function clearForms () {
  window.clearSidebarLeft()
  window.clearSidebarRight()
}

function resetForms () {
  hideForms()
  // TODO The following function should be a callback or a response to a promise.
  window.createForm()
  window.showSidebarLeft()
}

export function Character (choices) {
  this.choices = choices || {
    emotion: 'neutral',
    body: 'default', // Or 'default' or 'veiny'.
    eyeballs: 'default',
    skinColor: this.skinTone, // '#ffd5d5', // Or some random skin color from
    hairColor: '#ffe680', // Or random from list of hair colors',
    irisColor: '#2ad4ff', // Or some random eye color
    underwear: 'plain', // or random, whatever.
    underwearColor: '#f2f2f2' // Or random from a list of fabrics',
  }
  this.choices.emotion = this.choices.emotion || 'neutral'
  this.choices.body = this.choices.body || 'default'
  // this.choices.lips = this.choices.lips || 'default';
  if (this.skinTone) {
    this.choices.skinColor = this.skinTone
  }
  this.choices.hairColor = this.choices.hairColor || '#ffe680'
  this.choices.irisColor = this.choices.irisColor || '#2ad4ff'
  this.choices.underwear = this.choices.underwear || 'plain'
  this.choices.underwearColor = this.choices.underwearColor || '#f2f2f2'

  choices = this.choices
  if (!choices.body_head) {
    choices.body_head = 'default'
  }
  if (!choices.ears) {
    choices.ears = 'default'
  }
  if (!choices.nose) {
    choices.nose = 'default'
  }
};

function modCharacter (myKey, myValue) {
  // look in c.choices to see if the key is already there
  if (myKey in window.c.choices) {
    delete window.c.choices[myKey]
  };
  if (myKey === 'brows' || myKey === 'eyes' || myKey === 'lashes' || myKey === 'sockets') {
    return
  }
  // If there, modify the value
  // if not, add it in, with the value
  // if the value is '', then delete the key from the object,
  if (myValue !== '') {
    window.c.choices[myKey] = myValue
  };
  if (window.currentUser && window.currentUser.cc && window.currentUser.cc.personnages && window.currentUser.cc.personnageActuel) {
    window.currentUser.cc.personnages[window.currentUser.cc.personnageActuel][myKey] = myValue
  }
};

/*
export function createCharacter () {
  document.getElementById(sex + 'Button').checked = true
  // Draw the essential stuff
  // Draw stuff from the hash
  var forms = [form1, form2, form3]
  for (var lot in forms) {
    for (var x in forms[lot]) {
      var sectionTitle = x
      var t = sectionTitle.toLowerCase()
      var xsel = hash.get(t)
      if (xsel !== undefined) {
        var id = '#' + t + '_' + xsel
        for (lyr in multiLayer) {
          if (id.slice(1) == multiLayer[lyr][0]) {
            for (var i = 1; i <= multiLayer[lyr][1]; i++) {
              idOf = id + '_' + i + '_of_' + multiLayer[lyr][1]
              viewport.selectAll(idOf).attr({
                opacity: 1
              })
            }
          } else {
            viewport.selectAll(id).attr({
              opacity: 1
            })
          }
        };
      }
    }
  };
};
*/

function GetEmotionGetLayers (option) {
  var faceElements = ['brows', 'eyes', 'mouth', 'lashes', 'sockets']
  return faceElements
};

function getOptions (section) {
  var forms = window.forms
  var options
  section = window.capitalizeFirstLetter(section)
  for (var i in forms) {
    options = forms[i][section]
    if (options !== undefined) {
      return options
    }
  }
}

export function show (userChoice, category) {
  var multiLayer = window.getMultiLayer()
  var sections
  if (typeof (category) === 'string') {
    sections = [category]
  } else {
    sections = [category.split(' ')[1]]
  };
  var selectedOption = userChoice
  var options = getOptions(sections[0])
  var obj = []
  var id = '#' + sections[0] + '_' + selectedOption
  obj[category] = userChoice
  if (userChoice === '') {
    modCharacter(category, userChoice)
    window.hash.remove(category)
  } else {
    modCharacter(category, userChoice)
    window.hash.add(obj)
  }
  if (window.currentUser) {
    window.triggerSaveBtn()
  }
  if (sections[0] === 'emotion') {
    modCharacter(sections[0], selectedOption)
    window.ga('send', 'event', 'menu', 'select', id)
    sections = [] // Reset the sections layer so it doesn't contain 'emotion', as it isn't a layer in itself.
    var emotions = GetEmotionGetLayers(selectedOption)
    for (var emo in emotions) {
      sections.push(emotions[emo])
    }
  };
  displaySections(sections, options, selectedOption, multiLayer)
}

function displaySections (sections, options, selectedOption, multiLayer) {
  for (var section in sections) {
    options.forEach(function (d, i) {
      var id = '#' + sections[section] + '_' + d
      if (selectedOption !== '' && d === selectedOption) {
        sectionShow(multiLayer, id)

        if (sections[section] === 'brows' || sections[section] === 'eyes' || sections[section] === 'mouth' || sections[section] === 'lashes' || sections[section] === 'sockets') {
          modCharacter(sections[section], selectedOption)
        } else {
          var obj = []
          obj[sections[section]] = selectedOption
          window.hash.add(obj)
          modCharacter(sections[section], selectedOption)
          window.ga('send', 'event', 'menu', 'select', id)
        }
      } else {
        // FIXME: lyr isn't used
        sectionHide(multiLayer, id)
        /*
        for (var lyr in multiLayer) {
          sectionHide(multiLayer, id)
        }
        */
      };
    })
  };
}

function sectionShow (multiLayer, id) {
  var pupilShape
  var svgContainer = document.querySelector('#svg1')
  var isMultiLayered = false

  if (id === '#iris_default') { return };

  for (var lyr in multiLayer) {
    if (id.slice(1) === multiLayer[lyr][0]) {
      isMultiLayered = true
      break
    }
  }

  if (id.slice(1, 7) === 'pupils') {
    pupilShape = id.slice(1).split('_')[1]
    showPupils(pupilShape)
  } else if (id.slice(1, 5) === 'body' && id.slice(6, 10) !== 'head') {
    var idList = id.split('_')
    var bodySuffix = idList[idList.length - 1]
    var bodyLayers = getBodyLayers(bodySuffix)
    var bodyLayersCounter = bodyLayers.length
    var idOf

    while (bodyLayersCounter--) {
      idOf = '#' + bodyLayers[bodyLayersCounter]
      svgContainer.querySelector(idOf).style.opacity = 1
      svgContainer.querySelector(idOf).style.pointerEvents = 'auto'
    }
  } else {
    if (isMultiLayered) {
      var sectionToHide
      for (var i = 1; i <= multiLayer[lyr][1]; i++) {
        idOf = id + '_' + i + '_of_' + multiLayer[lyr][1]
        sectionToHide = svgContainer.querySelector(idOf)
        if (sectionToHide != null) {
          sectionToHide.style.opacity = 1
          sectionToHide.style.pointerEvents = 'auto'
        }
      }
    } else {
      svgContainer.querySelector(id).style.opacity = 1
      svgContainer.querySelector(id).style.pointerEvents = 'auto'
    }
  }

  if (id.slice(1).split('_')[0] === 'eyes') {
    window.changeClipPathOnEyes(id)
  }
}

function getBodyLayers (bodySuffix) {
  var bodyLayers = []

  bodyLayers.push('body_torso_' + bodySuffix)
  bodyLayers.push('body_arm_right_' + bodySuffix)
  bodyLayers.push('body_arm_left_' + bodySuffix)
  bodyLayers.push('body_forearm_right_' + bodySuffix)
  bodyLayers.push('body_forearm_left_' + bodySuffix)
  bodyLayers.push('body_leg_right_' + bodySuffix)
  bodyLayers.push('body_leg_left_' + bodySuffix)

  return bodyLayers
}

export function getAllBodyLayers () {
  var layers = window.getSectionLayersList('body')
  var counter = layers.length
  var bodyParts
  var files = []

  while (counter--) {
    bodyParts = getBodyLayers(layers[counter])
    files = files.concat(bodyParts)
  }
  return files
}

function showPupils (pupilShape) {
  var svg = document.querySelector('#svg1 .character-container')
  var pupils = svg.querySelectorAll('.pupil')
  var counter = pupils.length

  while (counter--) {
    if (pupils[counter].classList.contains('pupil--' + pupilShape)) {
      pupils[counter].style.opacity = 1
      pupils[counter].style.pointerEvents = 'auto'
    } else {
      pupils[counter].style.opacity = 0
      pupils[counter].style.pointerEvents = 'none'
    }
  }
}

function sectionHide (multiLayer, id) {
  var svgContainer = document.querySelector('#svg1')
  var sectionToHide

  // FIXME: where does lyr come from??? See 'id' argument...
  if (id.slice(1) === multiLayer[lyr][0]) {
    for (var i = 1; i <= multiLayer[lyr][1]; i++) {
      sectionToHide = svgContainer.querySelector(id + '_' + i + '_of_' + multiLayer[lyr][1])
      if (sectionToHide != null) {
        sectionToHide.style.opacity = 0
        sectionToHide.style.pointerEvents = 'none'
      }
    }
  } else if (id.slice(1, 5) === 'body' && id.slice(6, 10) !== 'head') {
    var idList = id.split('_')
    var bodySuffix = idList[idList.length - 1]
    var bodyLayers = getBodyLayers(bodySuffix)
    var bodyLayersCounter = bodyLayers.length

    var idOf
    while (bodyLayersCounter--) {
      idOf = '#' + bodyLayers[bodyLayersCounter]
      svgContainer.querySelector(idOf).style.opacity = 0
      svgContainer.querySelector(idOf).style.pointerEvents = 'none'
    }
  } else {
    sectionToHide = svgContainer.querySelector(id)

    if (sectionToHide != null) {
      sectionToHide.style.opacity = 0
      sectionToHide.style.pointerEvents = 'none'
    }
  };
}
