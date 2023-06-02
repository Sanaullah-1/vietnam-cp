import React from "react";
import AccountsCard from "../../components/AccountsCard/AccountsCard";
import Card from "../../components/shared/Card/Card";
import Table from "../../components/shared/Table/Table";

const AccountsPRO = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 col-xl-9">
          <AccountsCard />
        </div>
      </div>
      <div className="my-3 d-flex">
        <button className="btn btn-primary">
          Open Additional Live Account
        </button>
        <button className="btn btn-primary mx-3">Change Password</button>
        <button className="btn btn-primary">Change Leverage</button>
      </div>
      <div className="row">
        <div className="col-12 col-xl-9">
          <Card
            title="Recent Transfer"
            tabs={[
              { label: "Recent Transfer", key: "recent" },
              { label: "Open Position", key: "open" },
              { label: "Closed Position", key: "close" },
            ]}
          >
            <Table />
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountsPRO;
