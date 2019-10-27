var md5 = require('md5');

/*
* JavaScript utilities.
*/
export default class Utils {
  /*
  * Formats a Date() object into a string.
  */
  static formatDateTime(date) {
    return moment(date).format('LLLL');
  }

  /*
  * Returns a Date() object from a string in the same format
  * as formatDateTime();
  */
  static dateFromString(dateTimeString) {
    if (typeof dateTimeString === 'object') {
      // Assume that dateTimeString is a Date() object
      // and reurn that.
      return dateTimeString;
    }

    return new Date(dateTimeString.replace(' ', 'T').replace('Z', ''));
  }

  /*
  * Get the Rails authenticity token.
  */
  static getAuthenticityToken() {
    return document.querySelector('meta[name=csrf-token]')
      .getAttribute('content');
  }

  static getGravatarUrl(email, options = {}) {
    const hashedEmail = md5(email.trim().toLowerCase());
    const size = options.size || 32
    return `https://www.gravatar.com/avatar/${hashedEmail}.jpg?s=${size}&d=mm`;
  }

  // Based on https://stackoverflow.com/a/2234986
  static isDescendantOf(parent, child) {
    let childParent = child.parentNode;

    while (childParent != null) {
      if (childParent == parent) return true;

      childParent = childParent.parentNode;
    }

    return false;
  }
}
