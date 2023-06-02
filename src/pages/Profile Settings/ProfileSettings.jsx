import React, { useState } from "react";
import { useSelector } from "react-redux";
import TitleWithBackButton from "../../components/shared/TitleWithBackButton/TitleWithBackButton";
import ChangePassword from "./components/ChangePassword";
import ChangeIcon from "../../assets/icons/refresh.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ChangePhoneNumber from "./components/ChangePhoneNumber";
import { useTranslation } from "react-i18next";
const ProfileSettings = () => {
  const { t } = useTranslation();
  const [showChangePhoneModal, setshowChangePhoneModal] = useState(false);
  const currentUser = useSelector((state) => state.user);
  return (
    <section className="section">
      <TitleWithBackButton
        title={t("profile.settings.title")}
        path="/profile"
        name={t("profile.settings.go_back")}
      />
      <div className="card custom-shadow p-4 mb-4">
        <h5 className="heading">{t("profile.settings.account.label")}</h5>
        <div className="row gy-2" style={{ maxWidth: 800 }}>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.label")}
              </label>
              <input
                disabled
                className="form-control"
                value={currentUser.title}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.first_name")}
              </label>
              <input
                disabled
                className="form-control"
                value={currentUser.firstName}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.last_name")}
              </label>
              <input
                disabled
                className="form-control"
                value={currentUser.lastName}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.email")}
              </label>
              <input
                disabled
                className="form-control"
                value={currentUser.email}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.phone_number")}
              </label>
              <div className="input-group mb-3">
                {/* <select
                  id="disabledSelect"
                  className="form-select flex-grow-0 w-auto"
                  disabled
                >
                  <option>+971</option>
                  <option></option>
                  <option></option>
                </select> */}
                <input
                  type="text"
                  disabled
                  className="form-control flex-grow-1"
                  aria-label="Text input with dropdown button"
                  value={currentUser.phone}
                />
                {/* <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip`}>Change phone number.</Tooltip>
                  }
                >
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Tooltip on top"
                    className="btn btn-light rounded-0 p-2"
                    type="button"
                    id="button-addon2"
                    onClick={() => setshowChangePhoneModal(true)}
                  >
                    <img src={ChangeIcon} alt="" width={15} />
                  </button>
                </OverlayTrigger> */}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.nationality")}
              </label>
              <input
                disabled
                className="form-control"
                value={currentUser.nationality}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.residence")}
              </label>
              <input
                disabled
                className="form-control"
                value={currentUser.countryResidency}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                {t("profile.settings.account.form.address")}
              </label>
              <input
                disabled
                className="form-control"
                value={currentUser.address}
              />
            </div>
          </div>
          {/* <div className="col-12 col-md-6">
            <button className="btn btn-primary w-100">Submit</button>
          </div> */}
        </div>
      </div>
      <ChangePassword />
      <ChangePhoneNumber
        show={showChangePhoneModal}
        onClose={() => setshowChangePhoneModal(false)}
      />
    </section>
  );
};

export default ProfileSettings;
