export default class BaseComponent {
  transitionIn(transitionStartedClasses, transitionFinishedClasses, afterTransition) {
    this.el.classList.add(transitionStartedClasses)
    setTimeout(() => {
      this.el.classList.add(transitionFinishedClasses)
      if (afterTransition) afterTransition()
    }, 0)
  }

  transitionOut(transitionStartedClasses, transitionFinishedClasses, afterTransition) {
    this.el.classList.remove(transitionStartedClasses)
    setTimeout(() => {
      this.el.classList.remove(transitionFinishedClasses)
      if (afterTransition) afterTransition()
    }, 10)
  }

  isComponentBlurred = (clickTarget) => {
    return !this.el.contains(clickTarget)
  }

  addComponentBlurEvent() {
    document.addEventListener('click', this.onComponentBlur)
  }

  removeComponentBlurEvent() {
    document.removeEventListener('click', this.onComponentBlur)
  }
}
