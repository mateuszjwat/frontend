import axios from "axios";

const API_URL = "http://localhost:8080/api/fiszka/"

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

const test = (token) => {
    return axios.get(API_URL + "test", makeHeader(token));
}

export default{
    test,
    myFiszkas,
    uploadFiszkaSet,
    getFiszkaFromUrl,
    deleteFiszkaSet
}