import axios from "axios";

export async function getBankAccounts() {
    try {
        const { data } = await axios.get('/common/bank-account/list');
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function addBankAccount(values) {
    try {
        const { data } = await axios.post('/common/bank-account/create', values);
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function updateBankAccount(id, values) {
    try {
        const { data } = await axios.patch(`/common/bank-account/update/${id}`, values);
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}


export default {
    getBankAccounts,
    addBankAccount,
    updateBankAccount
}