import axios from "axios";

const API_URL = "https://test-app-demo-my.herokuapp.com/api/auth/";

function makeHeader(token){
    const header = {
        headers:{
        'Authorization': 'Bearer '+token
        }
    }
    return header;
}

const login = (username, password) => {
    return axios.post(API_URL + "signIn", {
        username,
        password,
    });
};

const register = (email, username, password) => {
    return axios.post(API_URL + "signUp", {
      username,
      email,
      password,
    });
};

const changePassword = (token, password) => {
    let data = {
        password: password
    }
    return axios.put(API_URL + "changePassword", data, makeHeader(token));
}

export default{
    register,
    login,
    changePassword
}