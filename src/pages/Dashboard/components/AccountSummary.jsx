import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreditCardIcon from "../../../assets/icons/credit-card.png";
import DepositIcon from "../../../assets/icons/deposit.png";
import WithdrawIcon from "../../../assets/icons/withdraw.png";

import _ from "lodash";
import { useTranslation } from "react-i18next";
const AccountSummary = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );
  const [currency, setcurrency] = useState("usd");
  useEffect(() => {
    if (!liveAccounts) setloading(true);
    else setloading(false);
  }, [liveAccounts]);

  const getCalculatedAmountByKey = (key) => {
    if (loading)
      return (
        <div className="spinner-border spinner-border-sm" role="status"></div>
      );

    let result = _.sumBy(liveAccounts, (o) => parseFloat(_.get(o, key)));
    result *= currency == "aed" ? 3.67 : 1;
    return result.toFixed(2) + " " + currency.toUpperCase();
  };
  const classes = "bg-white text-dark";
  return (
    <section className="section account-summary">
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="heading"> {t("dashboard.summary.title")}</h5>
        <div className="bg-light p-1 mb-3">
          <button
            className={classNames(
              "btn small py-2",
              currency == "usd" && classes
            )}
            onClick={() => setcurrency("usd")}
          >
            USD
          </button>
          {/* hidding for now to hide AED */}
          {/* <button
            className={classNames(
              "btn  text-muted small",
              currency == "aed" ? classes : "bg-transparent"
            )}
            onClick={() => setcurrency("aed")}
          >
            AED
          </button> */}
        </div>
      </div>

      <div className="card rounded-0 p-3 custom-shadow">
        <div className="row gy-4 gy-xl-0 align-items-center">
          <div className="col-12 col-md-6 col-xl-auto flex-grow-1 d-flex justify-content-between align-items-center">
            <div>
              <span className="label">
                {t("dashboard.summary.total_balance")}
              </span>
              <div className="value">{getCalculatedAmountByKey("balance")}</div>
            </div>
            <div className="p-1 px-2 bg-light">
              <img src={CreditCardIcon} alt="credit card" width={21} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-auto flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">
                {t("dashboard.summary.total_credit")}
              </span>
              <div className="value">
                {getCalculatedAmountByKey("mt5.Credit")}
              </div>
            </div>
            <div className="p-1 px-2 bg-light">
              <img src={CreditCardIcon} alt="credit card" width={21} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-auto flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">
                {t("dashboard.summary.total_equity")}
              </span>
              <div className="value">
                {getCalculatedAmountByKey("mt5.Equity")}
              </div>
            </div>
            <div className="p-1 px-2 bg-light">
              <img src={CreditCardIcon} alt="credit card" width={21} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-auto flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">
                {t("dashboard.summary.total_deposits")}
              </span>
              <div className="value">0.0 {currency.toUpperCase()}</div>
            </div>
            <div className="p-1 px-2" style={{ backgroundColor: "#cfe1ff" }}>
              <img src={DepositIcon} alt="credit card" width={14} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-auto flex-grow-1 d-flex justify-content-between align-items-center border-start">
            <div>
              <span className="label">
                {t("dashboard.summary.total_withdrawal")}
              </span>
              <div className="value">0.0 {currency.toUpperCase()}</div>
            </div>
            <div className="p-1 px-2" style={{ backgroundColor: "#ffe2e2" }}>
              <img src={WithdrawIcon} alt="credit card" width={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSummary;
