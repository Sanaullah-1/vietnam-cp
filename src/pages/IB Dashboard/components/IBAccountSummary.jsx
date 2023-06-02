import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreditCardIcon from "../../../assets/icons/credit-card.png";
import DepositIcon from "../../../assets/icons/deposit.png";
import WithdrawIcon from "../../../assets/icons/withdraw.png";

import _ from "lodash";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
import ibService from "../../../services/ib.service";
import { useTranslation } from "react-i18next";
const IBAccountSummary = () => {
  const { t } = useTranslation()
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState(null);
  const [accounts, setaccounts] = useState([]);
  const [selectedAccount, setselectedAccount] = useState("");

  useEffect(() => {
    (async function () {
      setloading(true);
      try {
        const [accountsRes, dataRes] = await Promise.all([
          ibService.getIbAccounts(),
          ibService.getAccountSummary(),
        ]);
        
        setaccounts(accountsRes.result && accountsRes.result.filter(obj => obj !== null));
        setselectedAccount(accountsRes.result[0]?.mt5Account);
        setdata(dataRes.result);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, []);

  const loadingIndicator = (
    <div className="spinner-border spinner-border-sm" role="status"></div>
  );

  const classes = "bg-white text-dark";
  return (
    <section className="section account-summary">
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="heading">{t('ib_portal.summary.title')}</h5>
        <SelectGroup
          loading={loading}
          options={accounts}
          valueText="mt5Account"
          titleText="mt5Account"
          name="accountNumber"
          hasInitial={false}
          className="d-none d-md-block"
          onChange={(e) => setselectedAccount(e.target.value)}
          value={selectedAccount}
        // errors={errors}
        // onChange={handleChange}
        />
      </div>

      <div className="card rounded-0 p-3 custom-shadow">
        <div className="row gy-4 gy-xl-0  align-items-center">
          <div className="col-12 d-md-none">
            <SelectGroup
              loading={loading}
              label={"Account"}
              options={accounts}
              valueText="mt5Account"
              titleText="mt5Account"
              name="accountNumber"
              hasInitial={false}
              onChange={(e) => setselectedAccount(e.target.value)}
              value={selectedAccount}
            />
          </div>
          <div className="col-12 col-md-6 col-xl-4 flex-grow-1 d-flex justify-content-between align-items-center">
            <div>
              <span className="label">{t('ib_portal.summary.total_live_clients')}</span>
              <div className="value">
                {loading ? loadingIndicator : data?.totalLiveClients}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4 flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">{t('ib_portal.summary.total_demo_clients')}</span>
              <div className="value">
                {loading ? loadingIndicator : data?.totalDemoClients}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4 flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">{t('ib_portal.summary.total_balance')}</span>
              <div className="value">
                {loading ? loadingIndicator : data?.clientsEquity?.USD ?? "0.0"}
              </div>
            </div>
          </div>
          <hr className="col-12 my-4 d-none d-xl-block" />
          <div className="col-12 col-md-6 col-xl-4 flex-grow-1 d-flex justify-content-between align-items-center">
            <div>
              <span className="label">{t('ib_portal.summary.total_clients_deposits')}</span>
              <div className="value">
                {loading ? loadingIndicator : data?.transactionSummary.DEPOSIT}
              </div>
            </div>
            <div className="p-1 px-2" style={{ backgroundColor: "#cfe1ff" }}>
              <img src={DepositIcon} alt="credit card" width={14} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4 flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">{t('ib_portal.summary.total_clients_withdrawal')}</span>
              <div className="value">
                {loading
                  ? loadingIndicator
                  : data?.transactionSummary.WITHDRAWAL}
              </div>
            </div>
            <div className="p-1 px-2" style={{ backgroundColor: "#ffe2e2" }}>
              <img src={WithdrawIcon} alt="credit card" width={14} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4 flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">{t('ib_portal.summary.total_withdrawal_profit')}</span>
              <div className="value">
                {loading
                  ? loadingIndicator
                  : data?.tradeState.find((s) => s?.Login == selectedAccount)
                    ?.Equity}
              </div>
            </div>
            <div className="p-1 px-2 bg-light">
              <img src={CreditCardIcon} alt="credit card" width={21} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IBAccountSummary;
