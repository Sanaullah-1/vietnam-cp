import React from "react";
import Card from "../shared/Card/Card";

const AccountsCard = () => {
  return (
    <Card
      title="Accounts"
      tabs={[
        { label: "Live Accounts", key: "live" },
        { label: "Demo Accounts", key: "demo" },
      ]}
    >
      {/* <Table /> */}
      <div className="row as-table">
        <div className="col">
          <label htmlFor="">ACCOUNT</label>
          <div>4356 - MT5</div>
        </div>

        <div className="col">
          <label htmlFor="">TYPE</label>
          <div>PRO</div>
        </div>
        <div className="col">
          <label htmlFor="">CURRENCY</label>
          <div>USD</div>
        </div>
        <div className="col">
          <label htmlFor="">BALANCE</label>
          <div>23.41</div>
        </div>
        <div className="col">
          <label htmlFor="">LEVERAGE</label>
          <div>1:1400</div>
        </div>
      </div>
      <hr />
      <div className="row as-table">
        <div className="col">
          <label htmlFor="">CREDIT</label>
          <div>32.54</div>
        </div>

        <div className="col">
          <label htmlFor="">EQUITY</label>
          <div>00.00</div>
        </div>
        <div className="col">
          <label htmlFor="">MARGIN FREE</label>
          <div>00.00</div>
        </div>
        <div className="col">
          <label htmlFor="">MARGIN LEVEL</label>
          <div>00.00</div>
        </div>
        <div className="col">
          <label htmlFor="">MARGIN</label>
          <div>00.00</div>
        </div>
      </div>
    </Card>
  );
};

export default AccountsCard;
