import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VerifiedIcon from "../../../assets/icons/verified-icon.png";
import NotVerifiedIcon from "../../../assets/icons/not-verified.png";
import { useTranslation } from "react-i18next";

const UserJourney = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const getCurrentUserJourneyStatus = () => {
    // completed profile
  };
  return (
    <>
      <section className="section">
        <div className="card px-3 px-md-4 py-3 round mb-4 custom-shadow d-flex align-items-start align-items-md-center start justify-content-between flex-column flex-md-row">
          <div className="mb-4 mb-md-0">
            <h6 className="d-flex align-items-center">
              <img
                src={(user.idUploaded || user.kycStatus === 4) ? VerifiedIcon : NotVerifiedIcon}
                alt=""
                width={23.5}
                className="me-3"
              />
              {(user.idUploaded || user.kycStatus === 4)
                ? t("dashboard.journey.verified_message")
                : t("dashboard.journey.non_verified_message")}
            </h6>
          </div>
          <Link
            to={(user.idUploaded || user.kycStatus === 4) ? "/deposit" : "/my-documents"}
            className="btn btn-primary">
            {(user.idUploaded || user.kycStatus === 4)
              ? t("dashboard.journey.fund_cta")
              : t("dashboard.journey.upload_cta")}
          </Link>
        </div>
      </section>
    </>
  );
};

export default UserJourney;
