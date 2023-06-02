import axios from "axios";

export async function getDocuments() {
    try {
        const { data } = await axios.get('/common/document/list');
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function getKycDocumentsList(kyc) {
    try {
        const { data } = await axios.get('/common/settings?data=' + kyc);
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export const getSumsubToken = async () => {
    const res = await axios.get(`/my/sum-sub-token?isId=true`);
    const { result, isSuccess, errors } = res.data;
    return result
  };
export const fetchSumsubDocuments = async (customerId) => {
    try {
        const res = await axios.get(`customers/${customerId}/sumsub-documents/`);
        const { result, isSuccess, errors } = res.data;
        return result;

    } catch (error) {
        const { message, isError } = error;
        return error
        // throw new Error(message);
    }
};
export async function addBankAccount(values) {
    try {
        const { data } = await axios.post('/common/bank-account/create', values);
        return data;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function uploadDocument(document) {
    try {
        let filesList = [];
        const query = `documentType=${document.title ? document.title : ''}`
        for (let file of document.files) {
            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post(
                `/my/upload-document?${query}`,
                formData
            );
            const { url } = res.data.result;
            const updatedFile = {
                path: url,
                name: file.name
            };
            filesList.push(updatedFile);
        }
        document.files = filesList;
        const res = await saveDocument(document);

        return res;
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export async function saveDocument(document) {
    try {
        const { data } = await axios.post('/common/document/add', document);
        return data
    } catch (error) {
        throw new Error(error.response.data);

    }
}




export default {
    getDocuments,
    getKycDocumentsList,
    fetchSumsubDocuments,
    addBankAccount,
    uploadDocument
}