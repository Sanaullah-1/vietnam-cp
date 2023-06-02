import React from "react";
import IBAccountSummary from "./components/IBAccountSummary";
import "./IBDashboard.scss";
import IBRecentClients from "./components/IBRecentClients";
import IBRecentTransactions from "./components/IBRecentTransactions";
const IBDashboard = () => {
  return (
    <div className="dashboard-wrapper pt-4">
      <IBAccountSummary />

      <IBRecentClients />

      <IBRecentTransactions />
    </div>
  );
};

export default IBDashboard;
