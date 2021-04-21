import Vue from 'vue'
import Vuex from 'vuex'

import setting from './setting'
import running from './running'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      setting, running
    },
    strict: process.env.DEV
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./setting', './running'], () => {
      const newSetting = require('./setting').default
      const newRunning = require('./running').default
      Store.hotUpdate({ modules: { setting: newSetting, running: newRunning } })
    })
  }

  return Store
}