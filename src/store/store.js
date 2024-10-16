import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./modules/auth.js";
import filter from "./modules/filter.js"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        filter
    }
})