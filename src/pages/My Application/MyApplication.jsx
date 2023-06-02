import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackChev from "../../assets/icons/back-chev.png";
import DownloadIcon from "../../assets/icons/download-file.png";
import TitleWithBackButton from "../../components/shared/TitleWithBackButton/TitleWithBackButton";
import { useTranslation } from "react-i18next";
import GeneratePDFFrom from "./components/GeneratePDF";
import { useSelector } from "react-redux";

const MyApplication = () => {
  const { t } = useTranslation();
  const [downloadPdf, setDownloadPdf] = useState(false)
  const currentUser = useSelector((state) => state.user);
  const [isIb, setIsIb] = useState(false);
  const handleDownload = () => {
    const fileUrl = 'https://accuindex.com/documents/Client-Agreement.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = 'Client-Agreement.pdf';
    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
  

  }
  useEffect(() => {
    setIsIb(window.location.href.includes("ib"))
  }, [])
  return (
    <section className="section">
      <TitleWithBackButton name={t("my_application.go_back")} />
      <div className="card custom-shadow px-3 py-4 flex-row justify-content-between align-items-center">
        <div>
          <h5 className="heading mb-1">{t("my_application.title")}</h5>
          <p className="small mb-0 text-muted">
            {t("my_application.description")}
          </p>
        </div>
        <Link>
          <GeneratePDFFrom
            client={currentUser}
            heading={t("my_application.description")}
            isIb={isIb}
          />
        </Link>
      </div>
      <Link
        onClick={() => {
          handleDownload()
        }}
        className="text-primary h6 text-decoration-none mt-4 d-block"
      >
        {t("my_application.agreement")}
      </Link>
    </section>
  );
};

export default MyApplication;
