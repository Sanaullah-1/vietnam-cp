import axios from "axios"
const endPoint = 'https://temp-psp.azurewebsites.net';
const getSkrillPaymentIframe = async (values) => {
    try {
        const { data } = await axios.post(`${endPoint}/skrill/pay`, values);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

const getMyFatoorahPaymentMethods = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/myfatoorah/payment-methods`);
        return data;
    } catch (error) {
        console.log(error)

    }
}
const getMyFatoorahPaymentLink = async values => {
    try {
        const { data } = await axios.post(`${endPoint}/myfatoorah/pay`, values);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const getNetellerPaymentLink = async values => {
    try {
        const { data } = await axios.post(`${endPoint}/paysafe/pay`, values);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const getCashuCheckoutId = async values => {
    try {
        const { data } = await axios.post(`${endPoint}/cashu/pay`, values);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const getVisaMasterCheckoutId = async values => {
    try {
        const { data } = await axios.post(`${endPoint}/qubepay/pay`, values);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const generateVisaGccSignature = async values => {
    try {
        const { data } = await axios.post(`${endPoint}/jcc/genSignature`, values);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const createPerfectMoneyOrder = async values => {
    try {
        const { data } = await axios.post(`${endPoint}/perfectmoney/pay`, values);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const getConversionRates = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/perfectmoney/get-rates`);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const getGetToPayCards = async () => {
    try {
        const { data } = await axios.post(`${endPoint}/gatetopay/list`);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const payWithGateToPay = async (values) => {
    try {
        const { data } = await axios.post(`${endPoint}/gatetopay/deposit`, values);
        return data;
    } catch (error) {
        throw error

    }
}
const hayvnDeposit = async (values) => {
    try {
        const { data } = await axios.post(`${endPoint}/hayvn/pay`, values);
        return data;
    } catch (error) {
        throw error

    }
}
 const sticpayPay = async (values) => {  
    try {
        const { data } = await axios.post(`${endPoint}/sticpay/pay`, values);
        return data;
    } catch (error) {
        throw error

    }
  };
  
  const help2PayGetBanks  = async () => {
    try {
        const { data } = await axios.get(`${endPoint}/help2pay/banks`);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const help2PayPay = async (values) => {  
    try {
        const { data } = await axios.post(`${endPoint}/help2pay/pay`, values);
        return data;
    } catch (error) {
        throw error

    }
  };
  const chippayPay = async (values) => {  
    try {
        const { data } = await axios.post(`${endPoint}/chippay/pay`, values);
        return data;
    } catch (error) {
        throw error

    }
  };
  const vertuPayGetBanks = async ()=>{
    try {
        const { data } = await axios.get(`${endPoint}/vertupay/banks`);
        return data;
    } catch (error) {
        console.log(error)
    }
  }
  const vertuPayPay  = async (values) => {  
    try {
        const { data } = await axios.post(`${endPoint}/vertupay/pay`, values);
        return data;
    } catch (error) {
        throw error

    }
  };
  

export default {
    getSkrillPaymentIframe,
    getMyFatoorahPaymentMethods,
    getMyFatoorahPaymentLink,
    getNetellerPaymentLink,
    getCashuCheckoutId,
    getVisaMasterCheckoutId,
    generateVisaGccSignature,
    getConversionRates,
    createPerfectMoneyOrder,
    getGetToPayCards,
    payWithGateToPay,
    hayvnDeposit,
    sticpayPay,
    help2PayGetBanks,
    help2PayPay,
    chippayPay,
    vertuPayGetBanks,
    vertuPayPay
}