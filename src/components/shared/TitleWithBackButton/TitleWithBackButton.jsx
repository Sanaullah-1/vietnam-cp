import React from "react";
import { useNavigate } from "react-router-dom";
import BackChev from "../../../assets/icons/back-chev.png";

const TitleWithBackButton = ({ title, path, name }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center">
      {title && <h5 className="heading">{title}</h5>}
      <button
        onClick={() => navigate(-1)}
        className="btn fw-normal d-flex align-items-center px-0"
        style={{ color: "#8ca8da", marginBottom: title ? 25 : 0 }}
      >
        <img src={BackChev} alt="" height={12.5} className="me-2" /> {name}
      </button>
    </div>
  );
};

export default TitleWithBackButton;
