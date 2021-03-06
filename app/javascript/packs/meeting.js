/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.

import Vue from 'vue'

import Meeting from '../src/views/Meeting'
import store from '../src/stores/meeting'

import _omit from 'lodash/omit'

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('meeting-root')
  if (!appRoot) return

  const meetingData = JSON.parse(appRoot.getAttribute('data-meeting'))
  store.commit('SET_AGENDA', meetingData.agenda)
  store.commit('SET_ACTION_ITEMS', meetingData.action_items)
  store.commit('SET_ATTENDEES', meetingData.attendees)
  store.commit('SET_MEETING', _omit(meetingData, ['agenda', 'action_items', 'attendees']))

  if (appRoot) {
    const app = new Vue({
      el: appRoot,
      store,
      render: h => h(Meeting)
    })
  }
})


// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })
