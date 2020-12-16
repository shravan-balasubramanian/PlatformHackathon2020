import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
// @todo: Use Vuex Modules to simplify the store.
export default new Vuex.Store({
  state: {
    newAppConfigs: {
      meta_details: {},
      iparams: {},
      workflows: [],
    },
  },
  mutations,
  actions,
  getters,
});
