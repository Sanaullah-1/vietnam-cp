import React from "react";
import Meta4Mock from "../../assets/images/meta4-mock.png";
import Meta5Mock from "../../assets/images/meta5-mock.png";
import Meta45Mock from "../../assets/images/meta45-mock.png";
import Meta4MockPhone from "../../assets/images/mt4-phone-mock.png";
import AccuGoMock from "../../assets/images/accugo-mock.png";
import AccuConnectMock from "../../assets/images/accuconnect-mock.png";


import Meta5MockPhone from "../../assets/images/mt5-phone-mock.png";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Platform = () => {
  const { t } = useTranslation();
  var media_query = "screen and (max-width:576px)";
  // matched or not
  var matched = window.matchMedia(media_query).matches;
  return (
    <section className="section">
      <h5 className="heading">{t("platforms.title")}</h5>
      <div
        className={classNames("card p-0 p-md-4", matched && "bg-transparent")}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <h5 className="heading">{t("platforms.desktop.title")}</h5>
          <div className="row gy-4">
            <div className="col-12 col-lg-6 col-xl-4">
              <div className="card custom-shadow">
                <img
                  src={Meta4Mock}
                  className="card-img-top"
                  alt="..."
                  style={{ backgroundColor: "#f5f6fa", maxHeight: 315 }}
                /> 
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {t("platforms.desktop.metatader")} 4
                  </h5>
                  <p className="card-text">
                    {t("platforms.desktop.meta_4.description")}
                  </p>
                  <div
                    className="px-2 py-3 text-start"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    <ul className="small mb-0">
                      {t("platforms.desktop.meta_4.list", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <a href="https://download.mql5.com/cdn/web/accuindex.limited/mt4/accuindexlimited4setup.exe" target="_blank" className="btn btn-primary w-100">
                    {t("platforms.download_windows")}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-4">
              <div className="card custom-shadow">
                <img
                  src={Meta5Mock}
                  className="card-img-top"
                  alt="..."
                  style={{ backgroundColor: "#f5f6fa", maxHeight: 315 }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {" "}
                    {t("platforms.desktop.metatader")} 5
                  </h5>
                  <p className="card-text">
                    {t("platforms.desktop.meta_5.description")}
                  </p>
                  <div
                    className="px-2 py-3 text-start"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    <ul className="small mb-0">
                      {t("platforms.desktop.meta_5.list", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <a href="https://download.mql5.com/cdn/web/accuindex.limited/mt5/accuindexlimited5setup.exe" target="_blank" className="btn btn-primary w-100">
                    {t("platforms.download_windows")}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-4">
              <div className="card custom-shadow">
                <img
                  src={Meta45Mock}
                  className="card-img-top"
                  alt="..."
                  style={{ backgroundColor: "#f5f6fa", maxHeight: 315 }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {t("platforms.mq.title")}
                  </h5>
                  <p className="card-text">{t("platforms.mq.description")}</p>
                  <div
                    className="px-2 py-3 text-start"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    <ul className="small mb-0">
                      {t("platforms.desktop.mq.list", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <Link to='/web-trader'
                    className="btn text-primary fw-bold w-100"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    {t("platforms.mq.cta")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <h5 className="heading mt-5">{t("platforms.mobile.title")}</h5>
          <div className="row gy-4">
            <div className="col-12 col-lg-6 col-xl-4">
              <div className="card custom-shadow">
                <img
                  src={Meta4MockPhone}
                  className="card-img-top py-2"
                  height={155}
                  alt="..."
                  style={{
                    backgroundColor: "#f5f6fa",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {" "}
                    {t("platforms.mobile.metatader")} 4
                  </h5>
                  <p className="card-text">
                    {t("platforms.mobile.meta_4.description")}
                  </p>
                  <div
                    className="px-2 py-3 text-start"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    <ul className="small mb-0">
                      {t("platforms.mobile.meta_4.list", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <a href="https://download.mql5.com/cdn/mobile/mt4/ios?server=AccuindexLimited-Demo,AccuindexLimited-Live" target="_blank" className="btn btn-primary w-100 mb-1">
                    {t("platforms.download_ios")}
                  </a>
                  <a href="https://download.mql5.com/cdn/mobile/mt4/android?server=AccuindexLimited-Demo,AccuindexLimited-Live" target="_blank" className="btn btn-primary w-100">
                    {t("platforms.download_android")}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-4">
              <div className="card custom-shadow">
                <img
                  src={Meta5MockPhone}
                  className="card-img-top py-2"
                  alt="..."
                  height={155}
                  style={{ backgroundColor: "#f5f6fa", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {" "}
                    {t("platforms.mobile.metatader")} 5
                  </h5>
                  <p className="card-text">
                    {t("platforms.mobile.meta_5.description")}
                  </p>
                  <div
                    className="px-2 py-3 text-start"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    <ul className="small mb-0">
                      {t("platforms.mobile.meta_5.list", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <a href="https://download.mql5.com/cdn/mobile/mt5/ios?server=AccuindexLimited-Demo,AccuindexLimited-Live" target="_blank" className="btn btn-primary w-100 mb-1">
                    {t("platforms.download_ios")}
                  </a>
                  <a href="https://download.mql5.com/cdn/mobile/mt5/android?server=AccuindexLimited-Demo,AccuindexLimited-Live" target="_blank" className="btn btn-primary w-100">
                    {t("platforms.download_android")}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-4">
              <div className="card custom-shadow">
                <img
                  src={AccuGoMock}
                  className="card-img-top py-2"
                  height={155}
                  alt="..."
                  style={{
                    backgroundColor: "#f5f6fa",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {" "}
                    {t("platforms.mobile.accugoname")}
                  </h5>
                  <p className="card-text">
                    {t("platforms.mobile.accugo.description")}
                  </p>
                  <div
                    className="px-2 py-3 text-start"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    <ul className="small mb-0">
                      {t("platforms.mobile.accugo.list", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <a href="https://apps.apple.com/us/app/accugo/id1665870172" target="_blank" className="btn btn-primary w-100 mb-1">
                    {t("platforms.download_ios")}
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.accutrade" target="_blank" className="btn btn-primary w-100">
                    {t("platforms.download_android")}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-4">
              <div className="card custom-shadow">
                <img
                  src={AccuConnectMock}
                  className="card-img-top py-2"
                  alt="..."
                  height={155}
                  style={{ backgroundColor: "#f5f6fa", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {" "}
                    {t("platforms.mobile.accuconnectname")}
                  </h5>
                  <p className="card-text">
                    {t("platforms.mobile.accuconnect.description")}
                  </p>
                  <div
                    className="px-2 py-3 text-start"
                    style={{ backgroundColor: "#f5f6fa" }}>
                    <ul className="small mb-0">
                      {t("platforms.mobile.accuconnect.list", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <a href="#" target="_blank" className="btn btn-primary w-100 mb-1">
                    {t("platforms.download_ios")}
                  </a>
                  <a href="#" target="_blank" className="btn btn-primary w-100">
                    {t("platforms.download_android")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;
