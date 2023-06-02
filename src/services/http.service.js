import axios from "axios";
import { toast } from "react-toastify";
import authService from "./auth.service";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL // should come from env;
// axios.interceptors.request.use((config) => {
//     if (config.headers.Authorization) {
//         var current_time = Date.now() / 1000;
//         if (authService.getCurrentUser().exp < current_time) {
//             /* expired */
//             console.log('expired');
//         } else {
//             console.log('not expired')
//         }
//     }

//     return config
// })
axios.interceptors.response.use(null, err => {
    // const expectedError =
    //     err.response && err.response.status >= 400 && err.response.status < 500;
    // if (!expectedError) {
    //     toast.error("Un expected error occurred");
    // } else if (err.response.status === 401) {
    //     toast.info("Login needed to do this action");
    // } else if (err.response.status === 400) {
    //     toast.error(err.response.data);
    // }
    if (err && err.response && err.response.status === 403) {
        toast.info("Session has been expired");
        authService.logout()
    }


    return Promise.reject(err);
});

export function setJwt(jwt) {
    if (jwt) axios.defaults.headers.common["Authorization"] = jwt;
}