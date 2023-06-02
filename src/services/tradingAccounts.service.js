import axios from "axios";
import {
    demoAccountAdded,
    demoAccountsLoaded,
    liveAccountAdded,
    liveAccountsLoaded,
} from "../redux/slices/tradingAccountsSlice";
import store from "../redux/store";

export async function getLiveAccounts() {
    try {
        const { data } = await axios.get("/my/live-applications");
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function fetchLiveAccountsAndStore() {
    try {
        const { data } = await axios.get("/my/live-applications");
        store.dispatch(liveAccountsLoaded(data.result));
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function getDemoAccounts() {
    try {
        const { data } = await axios.get("/my/demo-applications");
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function getAccountTypes(type = "demo") {
    try {
        const { data } = await axios.get(
            `/my/${type == "live" ? "account-types" : "demo-account-types"}`
        );
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function createAccountRequest(values) {
    try {
        const { data } = await axios.post("/request/account", values);
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function createNewAccount(type = "live", values) {
    try {
        const { data } = await axios.post(`/my/${type}-application`, values);
        if (type == "live") {
            const { result } = getLiveAccounts();
            store.dispatch(liveAccountsLoaded(result));
        } else {
            const { result } = getDemoAccounts();
            store.dispatch(demoAccountsLoaded(result));
        }
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function changeAccountPassword(accountId, values) {
    try {
        const { data } = await axios.post(
            `application/${accountId}/change-password`,
            values
        );
        return data.isSuccess;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function changeAccountLeverage(values) {
    // const getLiveAccountsDetails = await getLiveAccounts();
    // console.log("getLiveAccountsDetails", getLiveAccountsDetails)
    // const leverageAmount = getLiveAccountsDetails.result[0].leverage
    const currentLeverage = "1:"+values.currentLeverage
    const leverageAmount = values.leverage
    if(currentLeverage === leverageAmount){
        throw Error("Cannot Request for same amount leveage request");
    }
    // Check if the Reqest already exist
    try {
        const {data} = await axios.get('request/my-requests', {params: {type :"change leverage", status: "Pending"}})
        // return data.isSuccess
        if(data.result.totalDocs == 0){
            try {
                const { data } = await axios.post(`/request/change-leverage`, values);
                return data.isSuccess;
            } catch (error) {
                throw new Error(error.response.data);
            }
        } else {
            throw Error("You already have a pending leverage change");
        }
    } catch(error) {
        throw new Error(error);
    }


}

export async function getAccountOpenPositions(accountId, query) {
    try {
        const { data } = await axios.get(`/my/open-positions/${accountId}?`, {
            params: query,
        });
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function getAccountClosePositions(accountId, query) {
    try {
        const { data } = await axios.get(`/my/close-positions/${accountId}?`, {
            params: query,
        });
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function getAccountTransactions(accountId, query) {
    try {
        const { data } = await axios.get(`transaction/${accountId}?`, {
            params: query,
        });
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function getAccountDetails(accountId) {
    try {
        const [
            { data: recentTransfers },
            { data: openPositions },
            { data: closePositions },
        ] = await Promise.all([
            axios.get(`transaction/${accountId}?limit=5&page=1`),
            axios.get(`/my/open-positions/${accountId}?limit=5&offset=0`),
            axios.get(`/my/last5-close-positions/${accountId}?limit=5&offset=0`),
        ]);

        const data = {
            recentTransfers: recentTransfers.result,
            openPositions: openPositions.result.positions,
            closePositions: closePositions.result.positions,
        };
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export default {
    getLiveAccounts,
    getDemoAccounts,
    getAccountTypes,
    createNewAccount,
    createAccountRequest,
    getAccountDetails,
    changeAccountPassword,
    changeAccountLeverage,
    fetchLiveAccountsAndStore,
    getAccountOpenPositions,
    getAccountClosePositions,
    getAccountTransactions
};
