import React from "react";
import Avatar from "../shared/Avatar/Avatar";
import Card from "../shared/Card/Card";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Porfolio.scss";
const Portfolio = () => {
  return (
    <div className="portfolio-wrapper">
      <Avatar />
      <Card
        title="Overall Portfolio"
        trailing={
          <div>
            <button className="btn btn-outline-primary">Widthdrawal</button>
            <button className="btn btn-primary ms-2">Deposit</button>
          </div>
        }
      >
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex align-items-center ">
            <div className="total-funds me-5">
              <span>Total Funds</span>
              <div className="value">
                45.2354 <span>USD</span>
              </div>
            </div>
            <div className="manager">
              <span>Manager</span>
              <div className="value">Ahmed Hossam</div>
            </div>
          </div>
          <div className="journey-progress">
            <div className="circle-progress">
              <CircularProgressbar value={50} text={`2 OF 4`} />
            </div>
            <div className="ms-2">
              <div>Open Account</div>
              <span className="ms-1">Next: Verify Documents</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Portfolio;
