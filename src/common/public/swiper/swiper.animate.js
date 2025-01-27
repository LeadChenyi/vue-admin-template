﻿export function swiperAnimateCache() {
    const allBoxes = window.document.documentElement.querySelectorAll('.ani')
    for (var i = 0; i < allBoxes.length; i++) {
      allBoxes[i].attributes['style']
        ? allBoxes[i].setAttribute('swiper-animate-style-cache', allBoxes[i].attributes['style'].value)
        : allBoxes[i].setAttribute('swiper-animate-style-cache', ' ')
      allBoxes[i].style.visibility = 'hidden'
    }
  }
  
  export function swiperAnimate(a) {
    clearSwiperAnimate()
    var b = a.slides[a.activeIndex].querySelectorAll('.ani')
    for (var i = 0; i < b.length; i++) {
      b[i].style.visibility = 'visible'
      const effect = b[i].attributes['swiper-animate-effect']
        ? b[i].attributes['swiper-animate-effect'].value
        : ''
      b[i].className = b[i].className + ' ' + effect + ' ' + 'animated'
      const duration = b[i].attributes['swiper-animate-duration']
        ? b[i].attributes['swiper-animate-duration'].value
        : ''
      // duration && style
      const delay = b[i].attributes['swiper-animate-delay']
        ? b[i].attributes['swiper-animate-delay'].value
        : ''
      const style = b[i].attributes['style'].value + 'animation-duration:' + duration + ';-webkit-animation-duration:' + duration + ';' + 'animation-delay:' + delay + ';-webkit-animation-delay:' + delay + ';'
      // delay && (style = style )
      b[i].setAttribute('style', style)
    }
  }
  
  export function clearSwiperAnimate() {
    var allBoxes = window.document.documentElement.querySelectorAll('.ani')
    for (var i = 0; i < allBoxes.length; i++) {
      allBoxes[i].attributes['swiper-animate-style-cache'] && allBoxes[i].setAttribute('style', allBoxes[i].attributes['swiper-animate-style-cache'].value)
      allBoxes[i].style.visibility = 'hidden'
      allBoxes[i].className = allBoxes[i].className.replace('animated', ' ')
      const effectValue = allBoxes[i].attributes['swiper-animate-effect'].value
      /* eslint-disable-next-line */
      allBoxes[i].attributes['swiper-animate-effect'] && (effectValue, allBoxes[i].className = allBoxes[i].className.replace(effectValue, ' '))
    }
  }
  