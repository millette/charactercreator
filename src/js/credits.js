// TODO: import { closeAllOverlays } from modals.js

// export function rollCredits (evt) {
function rollCredits (evt) {
  if (evt) {
    evt.preventDefault()
  }

  var overlay = document.querySelector('.js-credits')
  // var closeBtn = overlay.querySelector('.close-btn')

  window.closeAllOverlays()

  overlay.classList.add('overlay--show')
  overlay.addEventListener('click', closeCredits, true)

  setTimeout(window.closeAllOverlays, 52000)
}

function closeCredits (evt) {
  var overlay = document.querySelector('.js-credits')
  var target = evt.target
  var credits

  if (target === overlay) {
    credits = document.querySelector('.overlay--show')
    if (credits) {
      credits.classList.remove('overlay--show')
    }
  }
}

// Content for Credits located in index.html
