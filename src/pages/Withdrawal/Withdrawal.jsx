import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectGroup from "../../components/shared/SelectGroup/SelectGroup";
import tradingAccountsService from "../../services/tradingAccounts.service";
import transactionsService from "../../services/transactions.service";
import CommonWithdrwalForm from "./components/CommonWithdrwalForm";

import depositUtils, {
  mapActiveWithdrawalGateways,
  paymentGatewayLogos,
  paymentGateways,
} from "../Deposit/utils/depositUtils";
import classNames from "classnames";
import WireTransferForm from "./components/WireTransferForm";
import SkrillWithdrawalForm from "./components/SkrillWithdrawalForm";
import GateToPayWithdrawalForm from "./components/GateToPayWithdrawalForm";
import { useTranslation } from "react-i18next";
import CryptoWithdrawalForm from "./components/CryptoWithdrawalForm";
const Withdrawal = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [gateways, setgateways] = useState([]);
  const [selectedGateway, setselectedGateway] = useState();
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );
  useEffect(() => {
    (async function () {
      setDataLoading(true);
      const { result } = await transactionsService.getWithdrawalGateways();
      setgateways(depositUtils.mapActiveWithdrawalGateways([...result, 'WIRE_TRANSFER']));
      setDataLoading(false);
      if (!liveAccounts) {
        await tradingAccountsService.fetchLiveAccountsAndStore();
      }
    })();
  }, []);

  const getPaymentGatewayForm = () => {
    console.log(selectedGateway);
    switch (selectedGateway) {
      case paymentGateways.VisaMaster:
      case paymentGateways.VisaJCC:
      case paymentGateways.MyFatoorah:
      case paymentGateways.Neteller:
      case paymentGateways.PerfectMoney:
      // case paymentGateways.Cashu:
      //   const validGateway = gateways.find(
      //     (g) => g.value == selectedGateway
      //   ).gateway; // THIS PART NEEDS TO BE CLEAN CODE, MAKE SURE YOU HAVE CONSTANT ENUM FOR PAYMENT GATEWAYS IN BACKEND AND FRONT END
      //   return <CommonWithdrwalForm gateway={validGateway} />;

      case paymentGateways.Crypto:
        let g = gateways.find(
          (g) => g.value == selectedGateway
        ).gateway
        return <CryptoWithdrawalForm gateway={g} />;
      case paymentGateways.WireTransfer:
        return <WireTransferForm />;
      case paymentGateways.Skrill:
        return <SkrillWithdrawalForm />;
      case paymentGateways.GateToPay:
        return <GateToPayWithdrawalForm />;

      default:
        return <h6>{t("withdrawal.choose_method_to_withdrawal")}</h6>;
    }
  };
  return (
    <>
      <section className="section">
        <h5 className="heading">{t("withdrawal.title")}</h5>
        <div className="card custom-shadow px-3 py-4 p-lg-5">
          <div className="mx-auto w-100" style={{ maxWidth: 550 }}>
            {selectedGateway && (
              <img
                src={paymentGatewayLogos[selectedGateway]}
                style={{ objectFit: "contain" }}
                className=" d-block mx-auto mb-4"
                width={110}
                height="70"
              />
            )}
            <div className="mb-3">
              <SelectGroup
                label={t("withdrawal.select_gateway")}
                defaultValue={paymentGateways.FasaPay}
                options={gateways}
                onChange={({ target }) => setselectedGateway(target.value)}
              />
            </div>

            <div className={classNames("mx-auto col-12  col-xl-6 w-100")}>
              {getPaymentGatewayForm()}
            </div>
          </div>
        </div>

        <div className="mt-4 col-12 col-lg-9">
          <h5 className="fw-bold mb-4">{t("withdrawal.notice_title")}</h5>
          <p className="small text-muted">{t("withdrawal.noties1")}</p>
          <p className="small text-muted">{t("withdrawal.noties2")}</p>
          <p className="small text-muted">{t("withdrawal.noties3")}</p>
        </div>
      </section>
    </>
  );
};

export default Withdrawal;
