import React from "react";
import EditIcon from "../../assets/icons/edit-pen.png";
import AccupaySvg from "../../assets/icons/ACCUPAY.svg";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user);
  return (
    <section className="section profile-wrapper">
      <div className="card p-3 mb-4">
        <div className="d-flex align-items-center mb-2">
          <h6 className="fw-bold me-3">
            {currentUser.firstName} {currentUser.lastName}
          </h6>

          <Link to="../my-settings">
            <img src={EditIcon} width={16} />
          </Link>
        </div>
        <span className="text-muted small">{currentUser.email}</span>
      </div>
      <div className="row gy-3" style={{ maxWidth: 1400 }}>
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="../my-documents" className="nav-link">
            <div className="card p-4">
              <img src={AccupaySvg} width={100} />{" "}
              <div className="d-flex align-items-center mb-2 justify-content-between mt-3">
                <h6 className="fw-bold me-3">{t("profile.my_docs.title")}</h6>
                <img src={EditIcon} width={19} />
              </div>
              {/* <p>{t("profile.my_docs.description")}</p> */}
            </div>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="../my-application" className="nav-link">
            <div className="card p-4">
              <img src={AccupaySvg} width={100} />{" "}
              <div className="d-flex align-items-center mb-2 justify-content-between mt-3">
                <h6 className="fw-bold me-3">
                  {t("profile.my_application.title")}
                </h6>
                <img src={EditIcon} width={19} />
              </div>
              {/* <p>{t("profile.my_application.description")}</p> */}
            </div>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="../activities" className="nav-link">
            <div className="card p-4">
              <img src={AccupaySvg} width={100} />{" "}
              <div className="d-flex align-items-center mb-2 justify-content-between mt-3">
                <h6 className="fw-bold me-3">
                  {t("profile.activities.title")}
                </h6>
                <img src={EditIcon} width={19} />
              </div>
              {/* <p>{t("profile.activities.description")}</p> */}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
