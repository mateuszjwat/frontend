import { useState, useEffect } from 'react';
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

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

export default{
    register,
    login
}