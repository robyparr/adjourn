import BaseComponent from './BaseComponent'

export default class Menu extends BaseComponent {
  constructor({ el, openingClass = 'opening', openClass = 'open' }) {
    super()
    this.el = document.querySelector(el)
    this.openingClass = openingClass
    this.openClass = openClass
    this.isOpen = false

    this.setupToggleEvent()
  }

  show = () => {
    this.transitionIn(this.openingClass, this.openClass, () => {
      this.isOpen = true
      this.addComponentBlurEvent()
    })
  }

  hide = () => {
    this.transitionOut(this.openClass, this.openingClass, () => {
      this.isOpen = false
      this.removeComponentBlurEvent()
    })
  }

  toggle = () => {
    if (this.isOpen) {
      this.hide()
    } else {
      this.show()
    }
  }

  onComponentBlur = (e) => {
    if (this.isComponentBlurred(e.target)) {
      return this.hide()
    }
  }

  setupToggleEvent() {
    this.el.addEventListener('click', this.toggle)
  }
}
