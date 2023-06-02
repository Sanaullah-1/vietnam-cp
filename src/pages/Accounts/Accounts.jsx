import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DemoAccounts from "../../components/DemoAccounts/DemoAccounts";
import LiveAccounts from "../../components/LiveAccounts/LiveAccounts";
import tradingAccountsService from "../../services/tradingAccounts.service";
import ChangeAccountPassword from "./components/ChangeAccountPassword";
import ClosedPositions from "./components/ClosedPositions";
import OpenedPositions from "./components/OpenedPositions";
import RecentTransfers from "./components/RecentTransfers";
import { useTranslation } from "react-i18next";

const Accounts = () => {
  const { t, i18n } = useTranslation();
  const detailsRef = useRef();
  const [detailsLoading, setdetailsLoading] = useState(false);
  const [accountType, setaccountType] = useState("live");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountDetails, setaccountDetails] = useState({
    recentTransfers: [],
    openPositions: [],
    closePositions: [],
  });
  const classes = (type) => {
    if (type == accountType) return "btn-primary";
    return "bg-white border";
  };

  useEffect(() => {
    if (selectedAccount) detailsRef.current.scrollIntoView();
  }, [selectedAccount]);

  const handleSelectAccount = async (account) => {
    try {
      setSelectedAccount(account);
      // const data = await tradingAccountsService.getAccountDetails(account._id);
      // setaccountDetails(data);
    } catch (error) { }
  };
  const handleChangeAccountType = (type) => {
    setaccountDetails({});
    setSelectedAccount(null);
    setaccountType(type);
  };
  return (
    <>
      <section className="section">
        <div className="d-flex align-items-start align-items-md-end justify-content-between flex-column flex-md-row">
          <h5 className="heading text-capitalize">
            {t("trading_accounts.title", { context: accountType })}
          </h5>
          <div className="d-flex">
            <button
              className={classNames("btn  border mb-3 me-2", classes("demo"))}
              onClick={() => handleChangeAccountType("demo")}>
              {t("trading_accounts.demo_cta")}
            </button>

            <button
              className={classNames("btn  border mb-3 me-2", classes("live"))}
              onClick={() => handleChangeAccountType("live")}>
              {t("trading_accounts.live_cta")}
            </button>
          </div>
        </div>
        {accountType == "live" ? (
          <LiveAccounts selectable onSelect={handleSelectAccount} />
        ) : (
          <DemoAccounts selectable onSelect={handleSelectAccount} />
        )}
        <div className="d-flex justify-content-end">
          <Link
            to={"/new-account?type=" + accountType}
            className="btn bg-white border ">
            + {t(`trading_accounts.${accountType}_cta`)}
          </Link>
        </div>
      </section>

      {selectedAccount && (
        <div ref={detailsRef}>
          <div className="py-4 fw-bold mb-2 h5">
            {t("trading_accounts.selected_acc")} {selectedAccount?.mt5Account}
          </div>
          <OpenedPositions selectedAccountId={selectedAccount._id} />
          <ClosedPositions selectedAccountId={selectedAccount._id} />
          <RecentTransfers selectedAccountId={selectedAccount._id} />
        </div>
      )}

      <div className="empty-space"></div>
    </>
  );
};

export default Accounts;
