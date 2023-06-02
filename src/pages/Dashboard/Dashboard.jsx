import React, { useEffect, useState } from "react";
import AccountSummary from "./components/AccountSummary";
import LiveAccounts from "../../components/LiveAccounts/LiveAccounts";
import "./Dashboard.scss";
import DemoAccounts from "../../components/DemoAccounts/DemoAccounts";
import { Link } from "react-router-dom";
import RecentActivities from "./components/RecentActivity";
import UserJourney from "./components/UserJourney";
// import Lo from "../../assets/images/banner.png";
import Lo from "../../assets/images/vietnam-promo.png";

import { useSSR, useTranslation } from "react-i18next";
import commonService from "../../services/common.service";
import Campaigns from "./components/CampaignModal";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const [showCampaign, setShow] = useState(false);

  const [isRequested, setIsRequested] = useState(false)
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );
  const { t } = useTranslation();
  useEffect(() => {
    (async function () {
      try {
        const requested = await commonService.isVietnamBonusRequested();
        
        console.log(requested,liveAccounts)
        setIsRequested(requested)

      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleSubmit = async () => {
    setShow(true)
  }
  const onClose = () => {
    setShow(false)
  }
  return (
    <div className="dashboard-wrapper">
      <UserJourney />
      <div className="card p-4 mb-5 custom-shadow d-flex align-items-start align-items-md-center justify-content-between flex-md-row flex-wrap">
        <div className="mb-3 mb-md-0">
          <h4 className="fw-bold">{t("dashboard.vietnam_campaign.title")}</h4>
          <p className="small mb-0 mt-2">
            {t("dashboard.vietnam_campaign.description")}
          </p>
        </div>
        <div className="">
          <img
            src={Lo}
            alt=""
            height={120}
            style={{ marginTop: "-1.5rem", marginBottom: "-1.5rem" }}
            className="d-xl-inline-block me-5 d-none "
          />
          <button
            // to="/new-account?type=live"
            className="btn btn-primary btn-lg rounded-0 fs-6"
            onClick={() => handleSubmit()}
          >
            {t("dashboard.vietnam_campaign.btn")}
          </button>
          <Campaigns 
          show={showCampaign} 
          onClose={onClose} 
          isRequested={isRequested}
          liveAccounts={liveAccounts}
          />
        </div>
      </div>
      <AccountSummary />
      <div className="d-flex align-items-end justify-content-between">
        <h5 className="heading">{t("dashboard.live_accounts.title")}</h5>

        <Link
          to="/new-account?type=live"
          className="btn bg-white border rounded-0 mb-3">
          + {t("dashboard.live_accounts.cta")}
        </Link>
      </div>
      <LiveAccounts />
      <div className="d-flex align-items-end justify-content-between">
        <h5 className="heading">{t("dashboard.demo_accounts.title")}</h5>

        <Link
          to="/new-account?type=demo"
          className="btn bg-white border rounded-0 mb-3">
          + {t("dashboard.demo_accounts.cta")}
        </Link>
      </div>
      <DemoAccounts />
      <RecentActivities />
    </div>
  );
};

export default Dashboard;
