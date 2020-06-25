// TODO: import { updateDbUser, manageCharacters } from login.js

export function newChar () {
  var newCard = document.querySelector('.js-new-card')
  var firstInput = newCard.querySelector('.first-input')
  newCard.classList.add('overlay__char-new--create')
  firstInput.focus()
}

export function createChar (evt) {
  if (evt) {
    evt.preventDefault()
  }
  var el = this
  var newCard = document.querySelector('.overlay__char-new--create')
  var newCharNameEl = el.parentNode.querySelector('.js-new-char-name')
  var newCharName = newCharNameEl.value

  newCard.classList.remove('overlay__char-new--create')
  var personnageActuel = newCharName
  if (!personnageActuel) { return }
  if (!window.currentUser.cc) { window.currentUser.cc = {} }
  if (!window.currentUser.cc.personnageActuel) { window.currentUser.cc.personnageActuel = personnageActuel }
  if (!window.currentUser.cc.personnages) { window.currentUser.cc.personnages = {} }
  window.currentUser.cc.personnages[personnageActuel] = window.hash.get()
  Object.assign(window.currentUser.cc.personnages, window.personnages)

  window.updateDbUser(window.currentUser)
    .then(function (json) {
      window.currentUser._rev = json.rev
      return json
      ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'New', eventLabel: 'Save new character' })
    })
    .catch(function (err) {
      console.log('err', err)
    })
  window.manageCharacters()
}

function deleteChar () {
  var el = this
  var disposible = el.parentNode.parentNode.querySelector('.overlay__char-name').innerHTML
  delete window.currentUser.cc.personnages[disposible]

  window.updateDbUser(window.currentUser)
    .then(function (json) {
      window.currentUser._rev = json.rev
      return json
      ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Delete', eventLabel: 'Delete character' })
    })
    .catch(function (err) {
      console.log('err', err)
    })
    window.manageCharacters()
}

function saveChar () {
  var saveBtn = document.querySelector('.save-btn')
  saveBtn.classList.remove('save--enabled')
  var personnageActuel = window.currentUser.cc.personnageActuel

  if (!myUsername || !window.currentUser) { return }
  if (!window.currentUser) { return }
  if (!personnageActuel) { return }
  if (!window.currentUser.cc) { window.currentUser.cc = {} }
  if (!window.currentUser.cc.personnageActuel) { window.currentUser.cc.personnageActuel = personnageActuel }
  if (!window.currentUser.cc.personnages) { window.currentUser.cc.personnages = {} }

  window.currentUser.cc.personnages[personnageActuel] = window.hash.get()

  Object.assign(window.currentUser.cc.personnages, window.personnages)

  window.updateDbUser(window.currentUser)
    .then(function (json) {
      window.currentUser._rev = json.rev
      return json
      ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Save', eventLabel: 'Save character' })
    })
    .catch(function (err) {
      console.log('err', err)
    })
}
