function showSidebarLeft () {
// export function showSidebarLeft () {
  var sidebarLeft = document.querySelector('#sidebar-left')
  sidebarLeft.classList.add('visible')
}

function hideSidebarLeft () {
// export function hideSidebarLeft () {
  var sidebarLeft = document.querySelector('#sidebar-left')
  sidebarLeft.classList.remove('visible')
}

function clearSidebarLeft () {
// export function clearSidebarLeft () {
  var sidebarLeft = document.querySelector('#sidebar-left')
  sidebarLeft.innerHTML = ''
}

/*
// TODO: unused, remove
function showSidebarRight () {
  var sidebarLeft = document.querySelector('#sidebar')
  sidebarLeft.classList.add('visible')
}
*/

function hideSidebarRight () {
// export function hideSidebarRight () {
  var sidebarLeft = document.querySelector('#sidebar')
  sidebarLeft.classList.remove('visible')
}

function clearSidebarRight () {
// export function clearSidebarRight () {
  var sidebarContent = document.querySelector('#content_1')
  var sidebarRight = document.querySelector('#sidebar')
  sidebarRight.classList.remove('visible')
  sidebarContent.innerHTML = ''
}
