import jwtDecode from "jwt-decode";
import axios from "axios";
import { setJwt } from "./http.service";

const apiEndPoint = "/auth/login";
const tokenKey = "currentUser1";

setJwt(getJwt());

export async function login(email, password) {
    try {
        const { data } = await axios.post(apiEndPoint, { email, password });
        localStorage.setItem(tokenKey, data.result.token);
        setJwt(getJwt());
    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}
export async function gateLogin(token) {
    try {
        const { data } = await axios.post('/gate/auth', { token });
        if(data && data.result && data.result.token) {
            localStorage.setItem(tokenKey, data.result.token);
            setJwt(getJwt());
        }
    } catch (error) {
        console.log(error.response.data)
        throw error;
    }
}
export async function refreshToken() {
    try {
        const { data } = await axios.post('/auth/refresh');
        localStorage.setItem(tokenKey, data.result.token);
        setJwt(getJwt());
    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}
export async function register(values) {
    try {
        const { isSuccess } = await axios.post('/customers/live', values);
        return isSuccess;
    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
    setJwt(getJwt());
}
export async function logout() {
    localStorage.removeItem(tokenKey);
    window.location = "/";
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}
export async function forgotPassword(email) {
    try {
        await axios.post('/customers/forgot-password', { email })

    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function resetPassword(token, password, confirmPassword) {
    try {
        const { data } = await axios.post('/auth/reset-password', { token, password, confirmPassword })
        return data.isSuccess;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function changePassword(values) {
    try {
        const { data } = await axios.post('/my/change-password', values)
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function checkEmailAvailability(email) {
    try {
        const { data } = await axios.post('/customers/email-availability', { email: email })
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function checkPhoneAvailability(phone) {
    try {
        const { data } = await axios.post('/customers/phone-availability', { phone: phone })
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function sendPinToEmail(email) {
    try {
        const { data } = await axios.post('/customers/create-pin', { email: email })
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function validateEmailPin(pin, email) {
    try {
        const { data } = await axios.post('/customers/verify-register-pin', { value: pin, email: email })
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function validateToken(token) {
    try {
        const { data } = await axios.post("/customers/verify-token", { token })
        return data.isSuccess;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export async function locateMe() {
    try {
        const { data } = await axios.get('/auth/locate');
        return data.result;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data);
    }
}

export default {
    login,
    gateLogin,
    register,
    logout,
    loginWithJwt,
    getCurrentUser,
    getJwt,
    forgotPassword,
    validateToken,
    resetPassword,
    changePassword,
    checkEmailAvailability,
    checkPhoneAvailability,
    validateEmailPin,
    sendPinToEmail,
    locateMe
};