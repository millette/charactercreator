// TODO import { hamburger } from hamburger-menu.js
// TODO import { resetCharacters, login } from login.js

function closeAllOverlays () {
  var overlays = document.querySelectorAll('.overlay--show')
  var counter = overlays.length

  while (counter--) {
    overlays[counter].classList.remove('overlay--show')
  }
}

function showAbout (ev) {
// export function showAbout (ev) {
  ev.preventDefault()
  var overlay = document.querySelector('.js-about')
  var closeBtn = overlay.querySelector('.close-btn')
  window.hamburger()
  closeAllOverlays()
  overlay.classList.add('overlay--show')
  overlay.addEventListener('click', closeOverlay, true)
  closeBtn.addEventListener('click', closeOverlay, false)
}

function showFAQ (ev) {
// export function showFAQ (ev) {
  ev.preventDefault()
  var overlay = document.querySelector('.js-faq')
  var closeBtn = overlay.querySelector('.close-btn')
  window.hamburger()
  closeAllOverlays()
  overlay.classList.add('overlay--show')
  overlay.addEventListener('click', closeOverlay, true)
  closeBtn.addEventListener('click', closeOverlay, false)
}

/*
export function showShop (ev) {
  ev.preventDefault()
  var overlay = document.querySelector('.js-shop')
  // console.log('url', upload())
  var closeBtn = overlay.querySelector('.close-btn')
  window.hamburger()
  closeAllOverlays()
  overlay.classList.add('overlay--show')
  overlay.addEventListener('click', closeOverlay, true)
  closeBtn.addEventListener('click', closeOverlay, false)
}
*/

function showDownloadOptions (ev) {
// export function showDownloadOptions (ev) {
  ev.preventDefault()
  var overlay = document.querySelector('.js-download-options')
  var closeBtn = overlay.querySelector('.close-btn')
  window.hamburger()
  closeAllOverlays()
  overlay.classList.add('overlay--show')
  overlay.addEventListener('click', closeOverlay, true)
  closeBtn.addEventListener('click', closeOverlay, false)
}

function logoutUI () {
// export function logoutUI () {
  var pageWrap = document.querySelector('.logged')
  if (pageWrap) {
    pageWrap.classList.remove('logged')
    window.resetCharacters()
  }
}

function loginMenu (evt) {
// export function loginMenu (evt) {
  if (evt) {
    evt.preventDefault()
  }
  var overlay = document.querySelector('.js-login')
  var loginForm = document.querySelector('#login-form')
  var firstInput = overlay.querySelector('.first-input')
  var closeBtn = overlay.querySelector('.close-btn')
  closeAllOverlays()
  overlay.classList.add('overlay--show')
  loginForm.addEventListener('submit', window.login, true)
  overlay.addEventListener('click', closeLogin, true)
  firstInput.focus()
  closeBtn.addEventListener('click', closeOverlay, false)
}

function closeLogin (evt) {
  var overlay = document.querySelector('.js-login')
  var cancelBtn = overlay.querySelector('.cancel-btn')
  var target = evt.target
  if (target === overlay || target === cancelBtn) {
    var login22 = document.querySelector('.overlay--show')
    if (login22) {
      clearInputFields()
      login22.classList.remove('overlay--show')
    }
  }
}

function closeOverlay (evt) {
  var overlay = document.querySelector('.overlay--show')
  if (overlay === null) { return };
  var cancelBtn = overlay.querySelector('.cancel-btn')
  var closeBtn = overlay.querySelector('.close-btn')
  var target = evt.target
  if (target === overlay || target === cancelBtn || target === closeBtn) {
    if (overlay) {
      hideNewCharacterInputField()
      overlay.classList.remove('overlay--show')
    }
  }
}

function hideNewCharacterInputField () {
  var overlay = document.querySelector('.overlay--show')
  var newField = overlay.querySelector('.overlay__char-new--create')
  if (newField) {
    clearInputFields()
    newField.classList.remove('overlay__char-new--create')
  }
}

function clearInputFields () {
  var currentOverlay = document.querySelector('.overlay--show')
  var inputList = currentOverlay.querySelectorAll('input')
  var inputListLength = inputList.length
  var errorField = currentOverlay.querySelector('.overlay__error--show')
  while (inputListLength--) {
    inputList[inputListLength].value = ''
  }
  if (errorField) {
    errorField.classList.remove('overlay__error--show')
  }
}

function clearInputUsername () {
// export function clearInputUsername () {
  var currentOverlay = document.querySelector('.overlay--show')
  var inputUsername = currentOverlay.querySelectorAll('.overlay__input__username')
  inputUsername[0].value = ''
}
