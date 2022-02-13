import axios from 'axios';
import jwtDecrypt from "../../shared/jwtHelper";


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const auth = {
    namespaced: true,
    data() {
        return {
            csrftoken: null,

        };
    },
    created() {
        this.csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    },
    
    state: {
        isAuthenticated: true,
        authData: {
            access_token: "",
            refreshToken: "",
            tokenExp: "",
            userId: "123456",
            userName: "Arjun",
          },
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        getAuthData: state => state.authData,
    },

    mutations: {
        saveTokenData(state, data) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
         
            const jwtDecodedValue = jwtDecrypt(data.access_token);
            const newTokenData = {
                access_token: data.access_token,
                refreshToken: data.refresh_token,
                tokenExp: jwtDecodedValue.exp,
                userId: jwtDecodedValue.sub,
                userName: jwtDecodedValue.userName,
            };
            state.authData = newTokenData;
        },

        setisAuthenticated(state, value){
            state.isAuthenticated = value;
        }

    },

    actions : {
        async login({commit},payload) {
            console.log(payload);

            axios({
                method: 'post',
                url: 'https://8000-naggd9-saffron-odav1i506ko.ws-us31.gitpod.io/api/token/',
                data: {
                    username: payload.username,
                    password: payload.password
                }
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

            

            // const request = new Request('https://8000-naggd9-saffron-odav1i506ko.ws-us31.gitpod.io/api/token/',
            //     {
            //         method: 'POST',
            //         headers: {'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value},
            //         mode: 'same-origin' // Do not send CSRF token to another domain.
            //     }
            // );
            // fetch(request).then(function(response) {
            //     console.log(response);
            // });
            const data = {
                access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs",
                refresh_token: ""
            };
            commit('saveTokenData', data);
            commit('setisAuthenticated', true);
        }
    }
};


export default auth;