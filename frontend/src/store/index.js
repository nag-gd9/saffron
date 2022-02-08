import vuex from "vuex";
import auth from "./modules/authentication";



const store = new vuex.Store({
    modules: {
        auth: auth,
    },
    state: {
        isLoggedIn: true,
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
    },
    mutations: {},
    actions: {},
});

export default store;