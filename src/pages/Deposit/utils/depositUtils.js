import ThunderX from "../../../assets/images/payment gateways/thunderx.png";
import FasaPay from "../../../assets/images/payment gateways/fasapay_logo2.png";
import Skrill from "../../../assets/images/payment gateways/skrill-logo-color.png";
import PerfectMoney from "../../../assets/images/payment gateways/perfect-money.png";
import VisaMaster from "../../../assets/images/payment gateways/visa-master.png";
import VisaJCC from "../../../assets/images/payment gateways/jccgateway_logo.png";
import MyFatoorah from "../../../assets/images/payment gateways/my-fatoorah.png";
import WireTransfer from "../../../assets/images/payment gateways/bank-transfer-color.png";
import Neteller from "../../../assets/images/payment gateways/Neteller_logo_logotype-color.png";
import Crypto from "../../../assets/images/payment gateways/hayvn_logo.png";
import Cahsu from "../../../assets/images/payment gateways/Cashu-color.png";
import GateToPay from "../../../assets/images/payment gateways/gatetopay.png";
import Dinarak from "../../../assets/images/payment gateways/dinarak.png";
import SticPay from "../../../assets/images/payment gateways/sticpay.jpg";
import Help2Pay from "../../../assets/images/payment gateways/help2pay.jpeg";
import chipPay from "../../../assets/images/payment gateways/chippay.png";
import aliPay from "../../../assets/images/payment gateways/alipay.png";
import unionPay from "../../../assets/images/payment gateways/union.png";
import wechatLogo from "../../../assets/images/payment gateways/wechat-logo.png";
import vertuPay from "../../../assets/images/payment gateways/vertuPay.png";
import _ from 'lodash'
export const paymentGatewayLogos = {
    // ThunderX,
    ['Fasapay']: FasaPay,
    ['Skrill']: Skrill,
    ['Perfect Money']: PerfectMoney,
    ['VISA, MASTER CARD - Qubepay']: VisaMaster,
    ['VISA, MASTER CARD - jccHPP']: VisaJCC,
    ['VISA, MASTER CARD - My Fatoorah']: MyFatoorah,
    ['Neteller']: Neteller,
    ['Crypto(BTC, ETH, USDT) - Hyvn']: Crypto,
    // ['Cahsu']: Cahsu,
    ["VISA, MASTER CARD - GateToPay"]:GateToPay,
    // Dinarak,
    ['Wire Transfer']: WireTransfer,
    ['SticPay']: SticPay,
    Help2Pay,
    aliPay,
    unionPay,
    wechatLogo,
   ["Alipay, UnionPay, WeChat - ChipPay"] :chipPay,
   ["VertuPay"]:vertuPay

}

export const paymentGateways = {
    // ThunderX: "ThunderX",
    FasaPay: "Fasapay", //done
    Skrill: "Skrill", //done
    PerfectMoney: "Perfect Money",
    VisaMaster: "VISA, MASTER CARD - Qubepay",
    VisaJCC: "VISA, MASTER CARD - jccHPP",
    MyFatoorah: "VISA, MASTER CARD - My Fatoorah", //done
    Neteller: "Neteller", //done
    Crypto: "Crypto(BTC, ETH, USDT) - Hyvn",
    // Cashu: "Cahsu", //done
    GateToPay: "VISA, MASTER CARD - GateToPay",
    // Dinarak: "Dinarak",
    WireTransfer: "Wire Transfer",
    SticPay: "SticPay",
    Help2Pay: "Help2Pay",
    chipPay:"Alipay, UnionPay, WeChat - ChipPay",
    vertuPay:"VertuPay"
}

export function openWindowWithPost(url, data) {
    var form = document.createElement("form");
    // form.target = "_blank";
    form.method = "POST";
    form.action = url;
    form.style.display = "none";

    for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }
    console.log(data)
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

export function mapActiveWithdrawalGateways(gateways) {
    let filteredGateways = [];
    gateways.forEach(g => {
        if (g == 'OTHER') {
            filteredGateways.push({
                name: 'Other',
                value: g,
                gateway: g
            })
        }
        if (_oldGateways[g]) {
            filteredGateways.push({
                name: paymentGateways[_oldGateways[g]],
                value: paymentGateways[_oldGateways[g]],
                gateway: g
            })
        }
    })

    filteredGateways = _.uniqBy(filteredGateways, 'value');
    return filteredGateways;
}

export default {
    mapActiveWithdrawalGateways
}


const _oldGateways = {
    'NETELLER': "Neteller",
    'PRAXIS': "Praxis",
    'Credit': "VisaMaster",
    'perfectm': "PerfectMoney",
    // 'bitpay': "BitPay - Crypto",
    // 'altcrypto': "Finrax - Crypto",
    // 'thunderxpay': "ThunderXPay",
    'CASHU': "Cashu",
    'SKRILL': "Skrill",
    'FASAPAY': "FasaPay",
    'WIRE_TRANSFER': "WireTransfer",
    'QUBEPAY': "VisaMaster",
    'CREDIT_CARD_HOSTED': "VisaJCC",
    'JCC': "VisaJCC",
    // 'SAFECHARGE': "Safecharge",
    // 'BITWALLET': "Bitwallet",
    // 'PAYPAL': "Paypal",
    'PERFECT_MONEY': "PerfectMoney",
    'MY_FATOORAH': "MyFatoorah",
    'myfatoorah': "MyFatoorah",
    'GATETOPAY': "GateToPay",
    'fasapay': "FasaPay",
    'DINARAK': "Dinarak",
    'Hayvn': "Crypto",
    'CRYPTO': "Crypto",
    'Credit Card': "VisaMaster"
}

// const _oldGateways = [
//     { name: 'Neteller', value: 'NETELLER' },
//     { name: 'Praxis', value: 'PRAXIS' },
//     { name: 'VisaMaster', value: 'Credit Card' },
//     { name: 'PerfectMoney', value: 'perfectm' },
//     // { name: 'BitPay - Crypto', value: 'bitpay' },
//     // { name: 'Finrax - Crypto', value: 'altcrypto' },
//     // { name: 'ThunderXPay', value: 'thunderxpay' },
//     { name: 'Cashu', value: 'CASHU' },
//     { name: 'Skrill', value: 'SKRILL' },
//     { name: 'FasaPay', value: 'FASAPAY' },
//     { name: 'WireTransfer', value: 'WIRE_TRANSFER' },
//     { name: 'VisaMaster', value: 'QUBEPAY' },
//     { name: 'VisaJCC', value: 'CREDIT_CARD_HOSTED' },
//     // { name: 'Safecharge', value: 'SAFECHARGE' },
//     // { name: 'Bitwallet', value: 'BITWALLET' },
//     // { name: 'Paypal', value: 'PAYPAL' },
//     { name: 'PerfectMoney', value: 'PERFECT_MONEY' },
//     { name: 'MyFatoorah', value: 'MY_FATOORAH' },
//     { name: 'GateToPay', value: 'GATETOPAY' },
//     { name: 'FasaPay', value: 'fasapay' },
//     // { name: 'Dinarak', value: 'DINARAK' },
//     // { name: 'Hayvn', value: 'Hayvn' },
//     { name: 'Crypto', value: 'CRYPTO' }

// ];
