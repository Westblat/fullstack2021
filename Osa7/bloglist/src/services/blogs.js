import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const loginUser = body => {
    return axios.post(loginUrl, body).then(response => response.data)
}

const createBlog = body => {
    const config = { headers: {} }
    config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('accessToken')
    return axios.post(baseUrl, body, config).then(response => response.data)
}

const updateBlog = body => {
    const config = { headers: {} }
    config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('accessToken')
    return axios.put(baseUrl + `/${body.id}`, body, config).then(response => response.data)
}
const deleteBlog = id => {
    const config = { headers: {} }
    config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('accessToken')
    return axios.delete(baseUrl + `/${id}`, config).then(response => response.data)
}
const functions = { getAll, loginUser, createBlog, updateBlog, deleteBlog }
export default functions
