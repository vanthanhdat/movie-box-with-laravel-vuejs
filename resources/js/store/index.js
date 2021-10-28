import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('access_token') || null,
        userProfile : localStorage.getItem('user_profile') || {},
    },

    getters: {
       isLoggedIn(state) { 
        return state.accessToken !== null && state.accessToken !== ''
       },
        getUser (state){
            if (typeof state.userProfile == 'string') {
                return JSON.parse(state.userProfile);   
            }else{
                return state.userProfile;
            }
       }
    },


    actions: {
        loadMovies(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('/api/movies?page=' + payload.page)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        movieDetails(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get('/api/movies/' + payload.id)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        login(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login',  payload)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        register(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/register',  payload)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        setUserAccess(context, payload) {
            context.commit('mutateAccessToken', payload)
        },
        unsetUserAccess(context, payload) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_profile')
            context.commit('mutateAccessToken', null)
        }, 
        postComment(context, payload) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken
            return new Promise((resolve, reject) => {
                axios.put('/api/movie/' + payload.movieId + '/comment/new', {
                    comment: payload.comment
                })
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        newMovie(context, payload) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
            return new Promise((resolve, reject) => {
                axios.post('/api/movie/new', payload)
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        logout(context, payload) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken
            return new Promise((resolve, reject) => {
                axios.get('/api/logout')
                .then(response => {
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        }
    },

    mutations: {
        mutateAccessToken(state, userProfile) { 
            if (userProfile != null) {
                localStorage.setItem('access_token', userProfile.access_token);
                localStorage.setItem('user_profile', JSON.stringify(userProfile));
                state.accessToken = userProfile.access_token;
                state.userProfile = userProfile;
            }else{
                state.accessToken = null;
                state.userProfile = {};
            }
        },
    },
    
})