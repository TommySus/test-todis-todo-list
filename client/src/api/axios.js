import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://todo-list-tommy.herokuapp.com/'
})

export default instance
