import axios from 'axios';

const auth = {
    namespaced: true,
    state: {
        isAuthenticated: true,
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
    },

    mutations: {},

    actions: {
                
    }
}


export default auth;