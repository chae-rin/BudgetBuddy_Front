import axios from 'axios';

class AuthenticationService {

    executeJwtAuthenticationService(user_id, user_pw){
        return axios.post('/authenticate', {
            user_id,
            user_pw
        });
    }

    registerSuccessLoginForJwt(user_id, token){
        sessionStorage.setItem('authenticatedUser', user_id);
        sessionStorage.setItem('token', token);

        this.setupAxiosInterceptors();
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            config => {
                const token = sessionStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser");
        sessionStorage.removeItem("token");
    }

    isUserLoggedIn() {
        const token = sessionStorage.getItem('token');
        if (token) {
            return true;
        }
        return false;
    }

    getLoginUserId() {
        let user = sessionStorage.getItem('authenticatedUser');
        if(user===null) return '';
        return user;
    }
}

export default new AuthenticationService()