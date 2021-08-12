import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    getAllData (state, payload) {
      state.data = payload
    }
  },
  actions: {
    fetchData (context) {
      return axios({
        method: 'GET',
        url: '/todos'
      })
        .then(({ data }) => {
          context.commit('getAllData', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createCard (context, payload) {
      return axios({
        method: 'POST',
        url: '/todos/card',
        data: {
          name: payload.name,
          BoardId: payload.BoardId
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    createBoard (context, payload) {
      return axios({
        method: 'POST',
        url: '/todos/board',
        data: {
          name: payload.name
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    createChecklist (context, payload) {
      return axios({
        method: 'POST',
        url: '/todos/checklist',
        data: {
          name: payload.name,
          CardId: payload.CardId
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    createChecklistData (context, payload) {
      return axios({
        method: 'POST',
        url: '/todos/checklistdata',
        data: {
          name: payload.name,
          ChecklistId: payload.ChecklistId
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteBoard (context, payload) {
      return axios({
        method: 'DELETE',
        url: `/todos/board/${payload}`
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCard (context, payload) {
      return axios({
        method: 'DELETE',
        url: `/todos/card/${payload}`
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteChecklist (context, payload) {
      return axios({
        method: 'DELETE',
        url: `/todos/checklist/${payload}`
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteChecklistData (context, payload) {
      return axios({
        method: 'DELETE',
        url: `/todos/checklistdata/${payload}`
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateBoard (context, payload) {
      return axios({
        method: 'PUT',
        url: `/todos/board/${payload.id}`,
        data: {
          name: payload.name
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateCard (context, payload) {
      return axios({
        method: 'PUT',
        url: `/todos/card/${payload.id}`,
        data: {
          name: payload.name,
          description: payload.description,
          BoardId: payload.BoardId
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateChecklist (context, payload) {
      return axios({
        method: 'PUT',
        url: `todos/checklist/${payload.id}`,
        data: {
          name: payload.name
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateChecklistData (context, payload) {
      return axios({
        method: 'PUT',
        url: `todos/checklistdata/${payload.id}`,
        data: {
          name: payload.name,
          status: payload.status
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchData')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
