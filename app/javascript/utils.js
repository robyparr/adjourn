var md5 = require('md5');

/*
* JavaScript utilities.
*/
export default class Utils {
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
}
