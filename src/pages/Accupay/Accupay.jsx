import React, { useEffect, useState } from "react";
import AccupayCard from "../../assets/images/accupay-card.png";
import AppButton from "../../components/shared/AppButton/AppButton";
import commonService from "../../services/common.service";
import CheckIcon from "../../assets/icons/check.png";
import { useTranslation } from "react-i18next";
const Accupay = () => {
  const { t } = useTranslation();

  const [isRequested, setisRequested] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const isRequested = await commonService.isAccupayRequested();
        setisRequested(isRequested);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, []);

  const requestAccupayCard = async () => {
    setloading(true);

    try {
      const { isSuccess } = await commonService.requestAccupayCard();
      if (isSuccess) {
        setisRequested(true);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <section className="section">
      <h5 className="heading">{t("accupay.title")}</h5>

      <div
        className="card p-4 px-3 px-md-4 custom-shadow"
        style={{ maxWidth: 1100 }}>
        <div className="row align-items-center">
          <div className="col-12 col-xl-5">
            <h5 className="fw-bold mb-2">{t("accupay.sub_title")}</h5>
            <p>{t("accupay.description")}</p>
            <div className="d-flex">
              <AppButton
                loading={loading}
                disabled={isRequested}
                onClick={requestAccupayCard}
                className="btn btn-primary text-start me-3 px-4 my-3 my-xl-0">
                <span className="d-block small">
                  {t("accupay.cta.request")}
                </span>
                {t("accupay.cta.accupay_card")}
              </AppButton>

              {/* <button className="btn btn-primary text-start me-3 px-4">
                <span className="d-block small">Download</span>
                Issuance Form
              </button> */}
              {/* <button className="btn btn-secondary border border-primary text-primary text-start me-3">
                <span className="d-block small">Upload</span>
                Signed Issuance Form
              </button> */}
            </div>
          </div>
          <div className="col d-none d-xl-block">
            <img src={AccupayCard} alt="" height={300} />
          </div>
        </div>
        {isRequested && (
          <div className="alert alert-success mb-0" role="alert">
            {t("accupay.already_requested")}
          </div>
        )}
      </div>
    </section>
  );
};

export default Accupay;
