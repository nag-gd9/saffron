import vuex from "vuex";
import auth from "./modules/auth";



const store = new vuex.Store({
    modules: {
        auth:auth
    },
    state: {
        
    },
    getters: {
        
    },
    mutations: {},
    actions: {},
});

export default store;