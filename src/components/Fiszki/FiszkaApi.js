import axios from "axios";

const API = "https://test-app-demo-my.herokuapp.com"
const API_URL = API + "/api/fiszka/"
const API_USER_URL = API + "/api/user/"

function makeHeader(token){
    const header = {
        headers:{
        'Authorization': 'Bearer '+token
        }
    }
    return header;
}

const getFiszkaFromUrl = (token, url) => {
    return axios.get(url, makeHeader(token));
}

const myFiszkas = (token) => {
    return axios.get(API_URL + "myFiszka", makeHeader(token));
}

const uploadFiszkaSet = (token, set) => {
    return axios.post(API_URL + "upload", set, makeHeader(token))
}

const deleteFiszkaSet = (token, id) => {
    return axios.delete(API_URL + "deleteSet?id=" + id, makeHeader(token))
}

const publishFiszkaSet = (token, id) => {
    return axios.post(API_URL + "makePublic?id=" + id, null ,  makeHeader(token))
}

const unPublishFiszkaSet = (token, id) => {
    return axios.post(API_URL + "unPublic?id=" + id, null ,  makeHeader(token))
}

const getPublic = () => {
    return axios.get(API_URL + "public");
}

const test = (token) => {
    return axios.get(API_URL + "test", makeHeader(token));
}

const uploadStatistics = (token, data) => {
    return axios.post(API_USER_URL + "postStatistic", data ,  makeHeader(token))
}

const updatePrivate = (token, data) => {
    return axios.post(API_USER_URL + "updatePrivate", data ,  makeHeader(token))
}

export default{
    test,
    myFiszkas,
    uploadFiszkaSet,
    getFiszkaFromUrl,
    deleteFiszkaSet,
    publishFiszkaSet,
    getPublic,
    uploadStatistics,
    updatePrivate,
    unPublishFiszkaSet
}