import axios from "axios";

export async function requestAccupayCard() {
    try {
        const { data } = await axios.post("/common/campaigns/submit", {
            title: "AccuPay",
            data: { confirmation: "Yes" },
            campaignId: "606d9866300c1d5a7452114d",
        });
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function isAccupayRequested() {
    try {
        const { data } = await axios.get(
            "/my/requests?type=campaignSubmit&campaign=606d9866300c1d5a7452114d"
        );

        return data.result.data.length > 0;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function requestPartnership(values) {
    try {
        const { data } = await axios.post("/request/partnership", values);
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function getCampaigns() {
    try {
        const { data } = await axios.get("/common/campaigns");
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function submitCampaign(values) {
    try {
        const { data } = await axios.post("/common/campaigns/submit", values);
        console.log("data============>", data)
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function isVietnamBonusRequested() {
    try {
        const { data } = await axios.get(
            "/my/requests?type=campaignSubmit&campaign=6479e989ae400255100c09bd"
        );
            console.log(data)
        return data.result.data.length > 0;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export default {
    requestAccupayCard,
    isAccupayRequested,
    requestPartnership,
    getCampaigns,
    submitCampaign,
    isVietnamBonusRequested
};
