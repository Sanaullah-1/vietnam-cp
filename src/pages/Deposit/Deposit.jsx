import React, { useEffect, useState } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import SelectGroup from "../../components/shared/SelectGroup/SelectGroup";
import tradingAccountsService from "../../services/tradingAccounts.service";
import CashuForm from "./components/GatewayForms/Cashu";
import FasaPayFrom from "./components/GatewayForms/FasaPay";
import MyFatoorahForm from "./components/GatewayForms/MyFatoorah";
import NetellerForm from "./components/GatewayForms/Neteller";
import PerfectMoneyForm from "./components/GatewayForms/PerfectMoney";
import SkrillForm from "./components/GatewayForms/Skrill";
import VisaJCCFrom from "./components/GatewayForms/VisaJCC";
import VisaMasterForm from "./components/GatewayForms/VisaMaster";
import PaymentIframeModal from "./components/PaymentIframeModal/PaymentIframeModal";
import PaymentsSlider from "./components/PaymentsSlider/PaymentsSlider";
import { paymentGatewayLogos, paymentGateways } from "./utils/depositUtils";
import "./Deposit.scss";
import WireTransfer from "./components/GatewayForms/WireTransfer";
import classNames from "classnames";
import GateToPayForm from "./components/GatewayForms/GateToPay";
import CryptoForm from "./components/GatewayForms/Crypto";
import { useTranslation } from "react-i18next";
import SticPay from "./components/GatewayForms/SticPay";
import Help2Pay from "./components/GatewayForms/Help2Pay";
import ChipPay from "./components/GatewayForms/ChipPay";

import authService from "../../services/auth.service";
import VertuPay from "./components/GatewayForms/VertuPay";


const Deposit = () => {
  const { t } = useTranslation();
  const [showIframeModal, setshowIframeModal] = useState(false);
  const [iframeUrl, setiframeUrl] = useState(null);
  const [iframeName, setIframeName] = useState('');
  const [scriptUrl, setScriptUrl] = useState(null);
  const [myLocation, setMyLocation] = useState(null);

  const [selectedGateway, setselectedGateway] = useState(
    paymentGateways.FasaPay
  );
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );
  const userResidence = useSelector(
    (state) => state.user.countryResidency
  );
  useEffect(() => {
    (async function () {
      if (!liveAccounts)
        await tradingAccountsService.fetchLiveAccountsAndStore();
      authService.locateMe().then(res => {
        setMyLocation(res.country);
      }).catch(err => {

      });
    })();
  }, []);

  useEffect(() => {
    if (iframeUrl || scriptUrl) {
      setshowIframeModal(true);
    }
  }, [scriptUrl, iframeUrl]);

  const iframeCallFunc = (url, name) => {
    setiframeUrl(url);
    setIframeName(name);
  }

  const getPaymentGatewayForm = () => {
    switch (selectedGateway) {
      case paymentGateways.Cashu:
        return <CashuForm />;
      case paymentGateways.MyFatoorah:
        return <MyFatoorahForm onIframeUrlLoaded={(url) => iframeCallFunc(url, 'MyFatoorah')} />;
      case paymentGateways.Neteller:
        return <NetellerForm onIframeUrlLoaded={(url) => iframeCallFunc(url, 'Neteller')} />;
      case paymentGateways.VisaMaster:
        return <VisaMasterForm />;
      case paymentGateways.VisaJCC:
        return <VisaJCCFrom />;
      case paymentGateways.FasaPay:
        return <FasaPayFrom />;
      case paymentGateways.PerfectMoney:
        return <PerfectMoneyForm />;
      case paymentGateways.GateToPay:
        return <GateToPayForm />;
      case paymentGateways.Crypto:
        return <CryptoForm />;
      case paymentGateways.WireTransfer:
        return <WireTransfer />;
      case paymentGateways.Skrill:
        return <SkrillForm onIframeUrlLoaded={(url) => iframeCallFunc(url, 'Skrill')} />;
      case paymentGateways.SticPay:
        return <SticPay onIframeUrlLoaded={(url) => iframeCallFunc(url, 'SticPay')} />;
      case paymentGateways.Help2Pay:
        return <Help2Pay />;
      case paymentGateways.chipPay:
        return <ChipPay />;
      case paymentGateways.vertuPay:
        return <VertuPay />;

      default:
        return <h6>Choose payment gateway to fund</h6>;
    }
  };

  const handleCloseIframe = () => {
    setshowIframeModal(false);
    setiframeUrl(null);
  };

  const getPaymentGatewayOptions = () => {
    const sortedGateways = Object.entries(paymentGateways).sort((a, b) => a[1].length - b[1].length);

    const sortedPaymentGateways = Object.fromEntries(sortedGateways);
    let pspArr = Object.keys(sortedPaymentGateways).map((g) => ({
      name: paymentGateways[g],
      value: paymentGateways[g],
    }))
    if (userResidence === 'Jordan' || (myLocation && myLocation === 'Jordan')) {
      pspArr = pspArr.filter(obj => obj.value !== 'VISA, MASTER CARD - My Fatoorah')
    }
    return pspArr;
  }

  const isWireTransfer = selectedGateway == paymentGateways.WireTransfer;
  return (
    <>
      <section className="section">
        <h5 className="heading">{t("deposit.title")}</h5>
        <div className="card custom-shadow px-3 py-4  p-lg-5">
          <div className="row">
            <div className="mx-auto d-flex flex-column">
              <PaymentsSlider />
              <div className="mt-lg-5">
                <div className="mb-5 mx-auto max-width">
                  <SelectGroup
                    label={t("deposit.select_method")}
                    hasInitial={false}
                    defaultValue={paymentGateways.FasaPay}
                    options={getPaymentGatewayOptions()}
                    onChange={({ target }) => setselectedGateway(target.value)}
                  />
                </div>
                <h5 className="heading text-center mb-5 d-flex align-items-center justify-content-center">
                  {t("deposit.fund_with")}
                  <img
                    src={paymentGatewayLogos[selectedGateway]}
                    style={{ objectFit: "contain" }}
                    className="ms-3"
                    width={100}
                    height="60"
                  />
                </h5>
                <div
                  className={classNames(
                    "mx-auto col-12 ",
                    !isWireTransfer && "max-width col-xl-6"
                  )}
                >
                  {getPaymentGatewayForm()}
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-5 mb-4" />
          <p className="text-muted small mb-0">{t("deposit.note")}</p>
        </div>
      </section>
      <PaymentIframeModal
        show={showIframeModal}
        iframeUrl={iframeUrl}
        scriptUrl={scriptUrl}
        iframeName={iframeName}
        onClose={handleCloseIframe}
      />
    </>
  );
};

export default Deposit;
