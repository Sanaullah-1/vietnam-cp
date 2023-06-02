import axios from "axios";

export async function getCurrentUserProfile() {
    try {

        const { data } = await axios.get('/auth/profile');
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function getCurrentUserJourney() {
    try {

        const { data } = await axios.get('/my/journey-status');
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function completeUserProfile(values) {
    try {

        const { data } = await axios.patch('/my/profile', values);
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function getUserActivities(query) {
    try {

        const { data } = await axios.get('/my/activities?isStatus=false', { params: query });
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}

export default {
    getCurrentUserProfile,
    getCurrentUserJourney,
    completeUserProfile,
    getUserActivities
}