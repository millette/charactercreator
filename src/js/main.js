// TODO: import { showAbout, showFAQ, loginMenu, closeAllOverlays, closeOverlay } from modals.js
// TODO: import { whoami, logout, registerMenu } from login.js
// TODO: import { rollCredits } from credits.js
// TODO: import { hamburger } from hamburger-menu.js
// TODO: import { viewBoxZoom, zoomFull, sectionZoom } from zoom.js
// TODO: import { smartRandomSingle } from random.js
// TODO: import { download } from download.js
// TODO: import { Character } from logic.js
// TODO: import { closeSections, showSection, loadFilesFromList } from form.js
// TODO: import { hideColorPicker } from colorpicker.js
// TODO: import { openThumbsLogic } from thumbnails.js
// TODO: import { interpretHash, parseHash } from parse_hash.js
// TODO: import { choicesToList, choicesToLayers, onAllLoaded } from loader.js
// TODO: import { applyClipPath } from clippaths.js
// TODO: import { rgb2hex } from helper.js
// TODO: import { defaultEyeColor, defaultHairColor } from color-defaults.js

var c // Main variable to hold user choices and preferences
var currentUser = false
var forms

window.onload = function () {
  var aboutBtn = document.querySelector('#aboutButton')
  var faqBtn = document.querySelector('#faqButton')
  // var shopBtn = document.querySelector('#shopButton')
  var whoBtn = document.querySelector('#whoButton')
  var logoutBtn = document.querySelector('#logoutButton')
  var loginBtn = document.querySelector('#loginButton')
  var registerBtn = document.querySelector('#registerButton')
  var registerLink = document.querySelector('.js-register-link')
  var creditsBtn = document.querySelector('#creditsButton')
  var hamburgerBtn = document.querySelector('.hamburger-btn')
  var zoomBtn = document.querySelector('#zoomLevel')
  var maleSilhouette = document.getElementById('male_silhouette')
  var femaleSilhouette = document.getElementById('female_silhouette')
  var rightSidebar = document.querySelector('#sidebar')
  // var rightSidebarClone = rightSidebar.cloneNode(true)
  rightSidebar.cloneNode(true)
  var svgContainer = document.querySelector('#svg1')
  var patreonLink = document.querySelector('#patreonButton')
  var patreonBtn = document.querySelector('#patreon-btn')
  var braveAffiliateBtn = document.querySelector('#brave-affiliate-btn')
  var newCharBtn = document.querySelector('#new-char-btn')
  var saveCharToCloudBtn = document.querySelector('#save-char-to-cloud-btn')
  var loadCharBtn = document.querySelector('#load-char-btn')
  var nightModeBtn = document.querySelector('#nightModeButton')
  var bigRedBtn = document.querySelector('#bigRedButton')
  var downloadBtn = document.querySelector('#proceed-download')

  if (aboutBtn && typeof window.showAbout === 'function') { aboutBtn.addEventListener('click', window.showAbout, false) }
  if (faqBtn && typeof window.showFAQ === 'function') { faqBtn.addEventListener('click', window.showFAQ, false) }
  // if (shopBtn && typeof showShop === 'function') { shopBtn.addEventListener('click', showShop, false) }
  if (whoBtn && typeof window.whoami === 'function') { whoBtn.addEventListener('click', window.whoami, false) }
  if (logoutBtn && typeof window.logout === 'function') { logoutBtn.addEventListener('click', window.logout, false) }
  if (loginBtn && typeof window.loginMenu === 'function') { loginBtn.addEventListener('click', window.loginMenu, false) }
  if (registerBtn && typeof window.registerMenu === 'function') { registerBtn.addEventListener('click', window.registerMenu, false) }
  if (registerLink && typeof window.registerMenu === 'function') { registerLink.addEventListener('click', window.registerMenu, false) }
  if (creditsBtn && typeof window.rollCredits === 'function') { creditsBtn.addEventListener('click', window.rollCredits, false) }
  if (hamburgerBtn && typeof window.hamburger === 'function') { hamburgerBtn.addEventListener('click', window.hamburger, false) }
  if (zoomBtn && typeof window.viewBoxZoom === 'function') { zoomBtn.addEventListener('change', window.viewBoxZoom, false) }
  if (maleSilhouette && typeof selectMale === 'function') { maleSilhouette.addEventListener('click', selectMale, false) }
  if (femaleSilhouette && typeof selectFemale === 'function') { femaleSilhouette.addEventListener('click', selectFemale, false) }
  if (svgContainer && typeof clickSelect === 'function') { svgContainer.addEventListener('click', clickSelect, false) }
  if (svgContainer && typeof layerHighlight === 'function') { svgContainer.addEventListener('mouseover', layerHighlight, false) }
  if (patreonLink && typeof tattle === 'function') { patreonLink.addEventListener('click', tattle, false) }
  if (patreonBtn && typeof gotoPatreon === 'function') { patreonBtn.addEventListener('click', gotoPatreon, false) }
  if (braveAffiliateBtn && typeof gotoBrave === 'function') { braveAffiliateBtn.addEventListener('click', gotoBrave, false) }
  if (newCharBtn && typeof gotoNewChar === 'function') { newCharBtn.addEventListener('click', gotoNewChar, false) }
  if (saveCharToCloudBtn && typeof saveCharToCloud === 'function') { saveCharToCloudBtn.addEventListener('click', saveCharToCloud, false) }
  if (loadCharBtn && typeof gotoLoadChar === 'function') { loadCharBtn.addEventListener('click', gotoLoadChar, false) }
  if (nightModeBtn && typeof switchNightMode === 'function') { nightModeBtn.addEventListener('click', switchNightMode, false) }
  // if (bigRedBtn && typeof window.smartRandomSingle === 'function') { bigRedBtn.addEventListener('click', window.smartRandomSingle, false) }
  if (downloadBtn && typeof window.download === 'function') { downloadBtn.addEventListener('click', window.download, false) }

  // checkNightMode()
  startup()
}

function saveCharToCloud (ev) {
  ev.preventDefault()
  console.log('saveCharToCloud')
  // Close current modal
  // Check if user is logged in
  // Check if this character already exists in the cast
  // If not, prompt to name the character in the cast modal
}

/*
function checkNightMode () {
  var body = document.querySelector('BODY')
  var checkBox = document.querySelector('#nightModeBox')

  if (checkBox.checked && !body.classList.contains('night')) {
    body.classList.toggle('night')
  }
}
*/

function switchNightMode (ev) {
  // document.documentElement.setAttribute('data-theme', 'lighttheme');
  window.ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Dark/Light', eventLabel: 'Switch between Dark mode and Light mode' })
  ev.preventDefault()
  var body = document.querySelector('BODY')
  window.hamburger()

  if (body.classList === '') {
    document.documentElement.setAttribute('data-theme', 'darktheme')
  } else if (body.classList === 'night') {
    document.documentElement.setAttribute('data-theme', 'lighttheme')
  }
  body.classList.toggle('night')
}

function tattle () {
  window.ga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Navbar | Patreon', eventLabel: 'Open Patreon page from the Navbar/Hamburger menu.' })
}

function gotoPatreon (evt) {
  if (evt) {
    evt.preventDefault()
  }
  window.ga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | Patreon', eventLabel: 'Open Patreon page from Caboose modal.' })
  window.closeAllOverlays()
  setTimeout(function () { window.open('https://www.patreon.com/charactercreator') }, 500)
}

function gotoBrave (evt) {
  if (evt) {
    evt.preventDefault()
  }
  window.ga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | Brave', eventLabel: 'Open Brave Browser page from Caboose modal.' })
  window.closeAllOverlays()
  console.log('brave')
  setTimeout(function () { window.open('https://brave.com/cha553') }, 500)
}

function gotoNewChar (evt) {
  if (evt) {
    evt.preventDefault()
  }
  window.ga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | New character', eventLabel: 'Reset to new character from Caboose.' })
  window.closeAllOverlays()
  setTimeout(function () {
    resetCharacter()
  }, 500)
}

function resetCharacter () {
  var choices = []
  // Hide menus.
  hideMenus()
  // Fade out SVG.
  fadeOutSVG()
  // Remove all groups.
  removeGroups()
  // Zoom out in case we were zoomed in.
  window.zoomFull()
  // reset silhouettes
  resetSilhouettes()
  // Clean hash.
  // Fade in SVG.
  // Clear 'c' variable.
  c = new window.Character(choices)
  setTimeout(function () { fadeInSVG() }, 300)
  // launch anew.
  relaunch()
}

function relaunch () {
  var male = document.querySelector('#male_silhouette')
  var female = document.querySelector('#female_silhouette')
  male.style.opacity = '1'
  female.style.opacity = '1'
}

function removeGroups () {
  var svgContainer = document.querySelector('#svg1 #character-container')
  var groups = svgContainer.querySelectorAll('#svg1 #character-container > g')
  var counter = groups.length

  while (counter--) {
    if (groups[counter].id !== 'female_silhouette' && groups[counter].id !== 'male_silhouette') {
      svgContainer.removeChild(groups[counter])
    }
  }
}

function hideMenus () {
  var menus = document.querySelectorAll('.sidebar.visible')
  var counter = menus.length

  while (counter--) {
    menus[counter].classList.remove('visible')
  }
}

function fadeOutSVG () {
  var svgContainer = document.querySelector('#svg1')
  var characterShadow = svgContainer.querySelector('.character-shadow.shine')
  var downloadBtn = document.querySelector('#downloadButton.enabled')

  if (characterShadow) {
    characterShadow.classList.remove('shine')
  }

  if (downloadBtn) {
    downloadBtn.classList.remove('enabled')
    downloadBtn.removeEventListener('click', window.download)
  }
  svgContainer.classList.add('character--hide')
}

function fadeInSVG () {
  var svgContainer = document.querySelector('#svg1')
  svgContainer.classList.remove('character--hide')
}

function resetSilhouettes () {
  // var silhouette
  var defaultColor = '#e35a4e'
  var svgContainer = document.querySelector('#svg1')
  var maleSilhouette = svgContainer.querySelector('#path_male')
  var femaleSilhouette = svgContainer.querySelector('#path_female')
  // var silhouetteRemaining

  /*
  if (svgContainer.classList.contains('select-female')) {
    silhouette = svgContainer.querySelector('#female_silhouette')
    // silhouetteRemaining = svgContainer.querySelector('#male_silhouette')
  } else if (svgContainer.classList.contains('select-male')) {
    silhouette = svgContainer.querySelector('#male_silhouette')
    // silhouetteRemaining = svgContainer.querySelector('#female_silhouette')
  }
  */
  svgContainer.classList = ''
  maleSilhouette.style.fill = defaultColor
  femaleSilhouette.style.fill = defaultColor

  if (maleSilhouette && typeof selectMale === 'function') { maleSilhouette.addEventListener('click', selectMale, false) }
  if (femaleSilhouette && typeof selectFemale === 'function') { femaleSilhouette.addEventListener('click', selectFemale, false) }
}

function gotoLoadChar (evt) {
  if (evt) {
    evt.preventDefault()
  }
  window.closeAllOverlays()
}

// The 'caboose' is the modal at the end of the character creation process.
export function caboose () {
  var overlay = document.querySelector('.js-caboose')
  var closeBtn = overlay.querySelector('.close-btn')

  window.closeAllOverlays()

  overlay.classList.add('overlay--show')
  overlay.addEventListener('click', window.closeOverlay, true)
  closeBtn.addEventListener('click', window.closeOverlay, false)
}

function layerHighlight (ev) {
  // var el = ev.target
  // var el = getGroupParent(el)
  var el = getGroupParent(ev.target)
  var masks = document.querySelectorAll('#contour use')
  var masksLen = masks.length

  if (masks[0].getAttribute('xlink:href') === el.id) {

  } else if (el.id === 'svg1') {
    while (masksLen--) {
      masks[masksLen].setAttribute('xlink:href', '')
    }
  } else {
    while (masksLen--) {
      masks[masksLen].setAttribute('xlink:href', '#' + el.id)
    }
  }
}

/*
function getViewBoxOnClick (el) {
  var viewBox = '10 50 540 540'
  var svgContainer = document.querySelector('#svg1')
  console.log('SVG1', svgContainer.viewBox)
  console.log('SVG1', svgContainer.viewBox.baseVal)
  console.log(el.getBoundingClientRect())
  return viewBox
}
*/

function clickSelect (ev) {
  // var viewBox = getViewBoxOnClick(el)
  // var el = ev.target
  // var el = getGroupParent(el)
  var el = getGroupParent(ev.target)
  // console.log('el',el);
  // console.log('viewBox',viewBox);
  // TODO check if style selection screen, return
  var formSection
  // var sidebarLeft = document.querySelector('#sidebar-left')
  var sectionList = document.querySelectorAll('section.accordeon__section-label')
  var isClosed
  var sectionLabel
  var prefix
  var prefixIndex
  var itemButtonList
  var itemButton
  // var faceContainer = document.querySelector('.face-styles');

  // Don't take the click while in the style selection screen.
  // if (faceContainer.style.opacity === '1') {return}

  if (c.choices.sex === undefined) { return }

  prefix = fromItemGetPrefix(el.id)
  formSection = fromPrefixGetFormSection(prefix)

  if (prefix === 'svg1') {
    window.zoomFull()
    return
  }

  // toggleSection
  // Check to see if the section is already open in sidebarRight
  // If not open, close all sections and open it.
  // Same thing for item thumbnails, if not open, open them.
  if (formSection > -1) {
    sectionLabel = sectionList[formSection].querySelector('.accordeon__section-title__text').innerHTML
    window.sectionZoom(sectionLabel)
    isClosed = sectionList[formSection].nextSibling.classList.contains('section--hide')
    window.closeSections(sectionList[formSection])

    if (isClosed) {
      window.showSection(sectionList[formSection])
    }
    // Get Prefix Index;
    prefixIndex = getSectionButton(formSection, prefix)

    if (prefixIndex > -1) {
      itemButtonList = sectionList[formSection].nextSibling.querySelectorAll('li.sbl__option')
      itemButton = itemButtonList[prefixIndex]
      window.hideColorPicker()
      window.openThumbsLogic(itemButton)
    }
  }
}

function getSectionButton (formSection, prefix) {
  var formList
  var keyCounter = 0
  if (c.choices.sex === 'm') {
    formList = window.maleFormList
  } else {
    formList = window.femaleFormList
  }
  for (var key in formList[formSection]) {
    if (prefix === key.toLowerCase()) {
      return keyCounter
    }
    ++keyCounter
  }
  return -1
}

function getLayers () {
  var layers

  if (c.choices.sex === 'm') {
    layers = window.layersMale
  } else if (c.choices.sex === 'f') {
    layers = window.layersFemale
  } else {
    return document.querySelector('#svg1 #character-container')
  }

  return layers
}

function getGroupParent (el) {
  var layers = getLayers()
  while (layers.indexOf(el.id) === -1 && el.tagName !== 'svg') {
    el = el.parentNode
  }
  return el
}

function getMultiLayer () {
  var multiLayer = []
  var layers = getLayers()
  var counter = layers.length
  var singleArray

  while (counter--) {
    if (layers[counter].slice(-6, -1) === '1_of_') {
      singleArray = []
      singleArray.push(layers[counter].slice(0, -7))
      singleArray.push(Number(layers[counter].slice(-1)))
      multiLayer.push(singleArray)
    }
  }
  return multiLayer
}

function getHairLayers () {
  var hairLayers = []
  var layers = getLayers()
  var counter = layers.length

  while (counter--) {
    if (layers[counter].slice(0, 5) === 'hair_' || layers[counter].slice(0, 11) === 'facialhair_' || layers[counter].slice(0, 6) === 'brows_' || layers[counter].slice(0, 7) === 'lashes_') {
      hairLayers.push(layers[counter])
    }
  }
  return hairLayers
}

function getSkinLayers () {
  var skinLayers = []
  var layers = getLayers()
  var counter = layers.length

  while (counter--) {
    if (layers[counter].slice(0, 5) === 'body_' || layers[counter].slice(0, 5) === 'ears_' || layers[counter].slice(0, 5) === 'nose_' || layers[counter].slice(0, 9) === 'freckles_' || layers[counter].slice(0, 5) === 'scar_' || layers[counter].slice(0, 11) === 'wings_devil' || layers[counter].slice(0, 6) === 'mouth_' || layers[counter].slice(0, 8) === 'sockets_') {
      skinLayers.push(layers[counter])
    }
  }

  return skinLayers
}

function fromItemGetPrefix (id) {
  console.log('fromItemGetPrefix', id)
  var idList = id.split('_')
  var prefix

  if (idList[0] === 'body' && idList[1] === 'head') {
    prefix = 'body_head'
  } else {
    prefix = idList[0]
  }
  return prefix
}

function fromPrefixGetFormSection (prefix) {
  console.log('prefix', prefix)
  // var item
  var formSection
  var counterForm
  // var counterSection
  var formList

  if (c.choices.sex === 'm') {
    formList = window.maleFormList
  } else {
    formList = window.femaleFormList
  }
  console.log('formList', formList)

  var key
  while (formSection === undefined) {
    counterForm = formList.length

    while (counterForm--) {
      for (key in formList[counterForm]) {
        if (key.toLowerCase() === prefix) { formSection = counterForm }
      }
    }
    if (formSection === undefined) { formSection = -1 }
  }
  return formSection
}

function startup () {
  var choices

  if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.cc.personnageActuel) {
    choices = currentUser.cc.personnages[currentUser.cc.personnageActuel]
  }
  window.c = new window.Character(choices)
  window.interpretHash()
}

function launch () {
  c.choices.sex = window.hash.get('sex')
  // var sex = c.choices.sex
  var multiLayer = getMultiLayer()
  var hairLayers = getHairLayers()
  var skinLayers = getSkinLayers()

  /*
  if (c.choices.sex === 'm') {
    var form1 = maleForm1
    var form2 = maleForm2
    var form3 = maleForm3
    var form4 = maleForm4
    var form5 = maleForm5
    var form6 = maleForm6
    // var layerDirectory = layerDirectoryMale
  } else {
    var form1 = femaleForm1
    var form2 = femaleForm2
    var form3 = femaleForm3
    var form4 = femaleForm4
    var form5 = femaleForm5
    var form6 = femaleForm6
    // var layerDirectory = layerDirectoryFemale
  }
  */

  // window.forms = [form1, form2, form3, form4, form5, form6]
  // window.forms = (c.choices.sex === 'm') ? window.maleFormList : window.femaleFormList
  forms = (c.choices.sex === 'm') ? window.maleFormList : window.femaleFormList

  // Get all the hash key/value pairs and include them in the c.choices object
  // Go through all the forms
  window.parseHash(c, forms, skinLayers, hairLayers) // Hashed elements are added in the character object
  window.choicesToList(c)
  var toBeShown = window.choicesToLayers(c, multiLayer)

  // FIXME: Promises promises...
  Promise.resolve().then(function () { window.loadFilesFromList(toBeShown) }).then(function () { window.onAllLoaded() }).then(function () { window.applyClipPath() })
}

function displayPalette () {
  var hashSkinColor = window.hash.get('skinColor')

  if (hashSkinColor !== undefined) {
    launch()
    // console.log('hashSkinColor', hashSkinColor);
    // colorCutout(hashSkinColor);
    // presentFaceStyles();
  } else {
    chooseSkinColor()
  }
}

function chooseSkinColor () {
  var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
  var gmenu = document.querySelector('.skin-color__container')

  if (!gmenu.firstChild) {
    for (var color in skinTones) {
      var newColor = skinTones[color]
      var node = document.createElement('LI')
      node.className = 'skin-tone'
      node.style.cssText = 'background-color:' + newColor + ';'
      gmenu.appendChild(node)
      node.onclick = colorCutout
      node.onmouseover = colorOnHover
    };
  }
  gmenu.classList.add('skin-color__container--show')
}

function defaultPupilShape () {
  c.choices.pupils = 'round'
  window.hash.add({ pupils: 'round' })
}

function colorOnHover () {
  var malePath = document.getElementById('path_male')
  var femalePath = document.getElementById('path_female')
  var newTone = this.style.backgroundColor
  femalePath.style.fill = newTone
  malePath.style.fill = newTone
}

/*
function colorSilhouette () {
  var malePath = document.getElementById('path_male')
  var femalePath = document.getElementById('path_female')
  var newTone = window.hash.get('skinColor')
  femalePath.style.fill = newTone
  malePath.style.fill = newTone
  femalePath.style.pointerEvents = 'none'
  malePath.style.pointerEvents = 'none'
}
*/

// function colorCutout (newColor) {
function colorCutout () {
  var rgb = this.style.backgroundColor
  var newColor = window.rgb2hex(rgb)
  /*
  var colorCards = document.getElementsByClassName('.skin-tone')
  var maleSilhouette = document.getElementById('male_silhouette')
  var femaleSilhouette = document.getElementById('female_silhouette')
  var lg = document.getElementsByClassName('lg')
  */

  var obj = []
  obj.skinColor = newColor
  var gmenu = document.querySelector('.skin-color__container')

  gmenu.classList.remove('skin-color__container--show')
  window.hash.add(obj)

  window.defaultEyeColor(newColor)
  window.defaultHairColor(newColor)
  defaultPupilShape()

  window.ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Color', eventLabel: 'Select color' })

  addDecency()
  addTopicalItem()

  // Uncomment the following for prod
  setTimeout(function () {
    launch()
  }, 300)
  // Uncomment the following to work on anime style
  // presentFaceStyles();
}

function selectMale (event) {
  c.choices.sex = 'm'
  var maleRadioBtn = document.querySelector('#mButton')
  var mainSVG = document.querySelector('#svg1')
  var maleSilhouette = document.querySelector('#male_silhouette')
  var femaleSilhouette = document.querySelector('#female_silhouette')
  var shadow = document.querySelector('.character-shadow')
  // Remove event listener to female silhouette.
  femaleSilhouette.removeEventListener('click', selectFemale)

  if (maleRadioBtn) {
    maleRadioBtn.checked = true
  }
  if (maleSilhouette) {
    maleSilhouette.removeEventListener('click', selectMale, false)
  }
  window.hash.add({ sex: 'm' })
  // var malePath = document.getElementById('path_male')

  mainSVG.classList.add('select-male')
  shadow.classList.add('shine')

  if (event) {
    window.ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Male', eventLabel: 'Select male template' })
  }

  setTimeout(function () {
    displayPalette()
  }, 350)
}

function addTopicalItem () {
  // hash.add({ mask: 'hospital' });
}

function addDecency () {
  var sex = c.choices.sex
  if (sex === 'm') {
    // TODO add underwear here.
  } else if (sex === 'f') {
    // TODO add underwear here.
    window.hash.add({ bra: 'bow' })
  }
}

function selectFemale (event) {
  c.choices.sex = 'f'
  var femaleRadioBtn = document.querySelector('#fButton')
  var mainSVG = document.querySelector('#svg1')
  var maleSilhouette = document.querySelector('#male_silhouette')
  var femaleSilhouette = document.querySelector('#female_silhouette')
  var shadow = document.querySelector('.character-shadow')

  maleSilhouette.removeEventListener('click', selectMale)

  if (femaleRadioBtn) {
    femaleRadioBtn.checked = true
  }
  if (femaleSilhouette) {
    femaleSilhouette.removeEventListener('click', selectFemale, false)
  }
  window.hash.add({ sex: 'f' })
  // var femaleSilhouette = document.getElementById('female_silhouette')
  // var femalePath = document.getElementById('path_female')
  mainSVG.classList.add('select-female')
  shadow.classList.add('shine')

  if (event) {
    window.ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Female', eventLabel: 'Select female template' })
  }

  setTimeout(function () {
    displayPalette()
  }, 350)
}

/*
function presentFaceStyles () {
  var sex = c.choices.sex
  console.log('sex', sex)
  console.log('presentFaceStyles')
  var faceWestern
  var faceAnime
  var faceContainer = document.querySelector('.face-styles')
  var faceStyle = faceContainer.querySelector('STYLE')
  console.log('faceContainer', faceStyle)

  //   if (c.choices.faceStyle) {
  //     launch();
  //     return;
  //   }
  //
  colorSilhouette()
  zoomTwoFaces()
  //
  if (sex === 'm') {
    faceWestern = document.querySelector('.male-face-western-style')
    faceAnime = document.querySelector('.male-face-anime-style')
    hideWestern = document.querySelector('.female-face-anime-style')
    hideAnime = document.querySelector('.female-face-anime-style')
  } else {
    faceWestern = document.querySelector('.female-face-western-style')
    faceAnime = document.querySelector('.female-face-anime-style')
    hideWestern = document.querySelector('.male-face-western-style')
    hideAnime = document.querySelector('.male-face-anime-style')
  }
  // female-face-anime-style
  // TODO Color the eyes and eyebrows to fit with the skin tone.

  // TODO Transform Translate horizontaly to make both styles visible.

  hideWestern.classList.add('inactive-vector')
  hideAnime.classList.add('inactive-vector')
  faceWestern.classList.add('active-vector')
  faceAnime.classList.add('active-vector')
  faceWestern.style.opacity = 1
  faceAnime.style.opacity = 1
  faceWestern.style.transform = 'translateX(-23px)'
  faceAnime.style.transform = 'translateX(23px)'
  faceContainer.style.opacity = 1

  // TODO: Add event listener to both face styles;

  // launch();
}
*/

/*
function selectStyleWestern () {
  console.log('selectStyleWestern')

  // TODO Transform Translate horizontaly to match face on head;

  // launch();
}

function selectStyleAnime () {
  console.log('selectStyleAnime')

  // TODO Transform Translate horizontaly to match face on head;

  // launch();
}
*/
