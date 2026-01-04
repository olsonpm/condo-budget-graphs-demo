// this code is based off this SO answer
// https://stackoverflow.com/a/64181276/984407
// and modified for my use case
const smoothScrollTo = (element, duration) => {
  var e = document.documentElement
  if (e.scrollTop === 0) {
    var t = e.scrollTop
    ++e.scrollTop
    e = t + 1 === e.scrollTop-- ? e : document.body
  }
  scrollToC(e, e.scrollTop, element, duration)
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
  if (duration <= 0) return
  if (typeof from === 'object')
    from = from.getBoundingClientRect().top + scrollY
  if (typeof to === 'object') to = to.getBoundingClientRect().top + scrollY

  scrollToY(element, from, to, 0, 1 / duration, 20, easeOutCuaic)
}

function scrollToY(element, yFrom, yTo, t01, speed, step, motion) {
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollTop = yTo
    return
  }
  element.scrollTop = yFrom - (yFrom - yTo) * motion(t01)
  t01 += speed * step
  setTimeout(function () {
    scrollToY(element, yFrom, yTo, t01, speed, step, motion)
  }, step)
}

function easeOutCuaic(t) {
  t--
  return t * t * t + 1
}

export default smoothScrollTo
