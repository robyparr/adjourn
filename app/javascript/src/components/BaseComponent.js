export default class BaseComponent {
  transitionIn(transitionStartedClasses, transitionFinishedClasses, afterTransition) {
    return new Promise((resolve) => {
      this.el.classList.add(transitionStartedClasses)
      setTimeout(() => {
        this.el.classList.add(transitionFinishedClasses)
        resolve()
      }, 0)
    })
  }

  transitionOut(transitionStartedClasses, transitionFinishedClasses) {
    return new Promise((resolve) => {
      this.el.classList.remove(transitionFinishedClasses)
      setTimeout(() => {
        this.el.classList.remove(transitionStartedClasses)
        resolve()
      }, 100)
    })
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
