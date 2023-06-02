import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckIcon from "../../assets/icons/check.png";
import { useTranslation } from "react-i18next";

const Partnership = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user);
  return (
    <section className="section">
      <div className="card p-3 custom-shadow">
        <h5 className="heading mb-0">{t("partnership.title")}</h5>
      </div>
      <div className="my-3">
        {!currentUser.isIb ? (
          t("partnership.no_partnership_message")
        ) : (
          <div className="alert alert-success" role="alert">
            {t("partnership.requested_message")}
          </div>
        )}
      </div>
      {!currentUser?.isIb && (
        <Link to="/partnership-request" className="btn btn-primary">
          {t("partnership.cta")}
        </Link>
      )}
    </section>
  );
};

export default Partnership;
