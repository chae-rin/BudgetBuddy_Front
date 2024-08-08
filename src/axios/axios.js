import axios from 'axios';

// Request Intercepter
axios.interceptors.request.use(function (config) {
    console.log('==request intercepter==');
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Response Intercepter
axios.interceptors.response.use(function (response){
    console.log('==response intercepter==');
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axios;