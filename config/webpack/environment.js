const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')

const vue = require('./loaders/vue')
const sass = require('./loaders/sass')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
environment.loaders.prepend('sass', sass)

module.exports = environment
