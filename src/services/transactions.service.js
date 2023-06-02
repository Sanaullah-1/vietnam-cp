import axios from "axios";

export async function getTransactions(query) {
    try {
        const { data } = await axios.get('/transaction/report', { params: query });
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function internalTransfer(values) {
    try {
        const { data } = await axios.post('/transaction', values);
        return data;
    } catch (error) {
        throw error;
    }
}
export async function withdrawalRequest(values) {
    try {
        const { data } = await axios.post('/transaction', values);
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getWithdrawalGateways() {
    try {
        const { data } = await axios.get('/my/active-gateways');
        return data;
    } catch (error) {
        throw error;
    }
}

export default {
    getTransactions,
    internalTransfer,
    getWithdrawalGateways,
    withdrawalRequest
}