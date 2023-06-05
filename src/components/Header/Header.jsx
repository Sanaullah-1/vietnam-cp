import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import MenuIcon from "../../assets/icons/menu.png";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LangIcon from "../../assets/icons/language.png";
import classNames from "classnames";
import { getClientType } from "../..//utils/userUtils";

const Header = ({ handleShow }) => {
  const { t } = useTranslation()
  const { i18n } = useTranslation();

  const [lang, setlang] = useState(i18n.language);
  const location = useLocation();

  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setlang(lng)
  };
  const isIbPortal = location.pathname.toLocaleLowerCase().includes("/ib");

  return (
    <header
      className="d-flex align-items-center justify-content-between bg-white mb-4 mb-lg-5"
      style={{ height: 70 }}
    >
      <button onClick={handleShow} className="d-lg-none btn">
        <img src={MenuIcon} alt="" width={30} height={30} />
      </button>
      {getClientType(currentUser.clientType) == 3 && (
        <Link
          to={isIbPortal ? "/" : "/ib"}
          className="btn bg-white border rounded-0 ms-3 fw-semibold mx-3"
        >
          <div class="form-check form-switch m-0 d-flex align-items-center">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              checked={isIbPortal}
              readOnly={true}
              style={{ pointerEvents: "none" }}
            />
            <label
              class={classNames(
                "form-check-label ms-2 pointer",
                isIbPortal && "text-primary"
              )}
            >
              {t('header.ib_portal')}
            </label>
          </div>
        </Link>
      )}
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <Dropdown as={ButtonGroup} onSelect={(lang) => changeLanguage(lang)}>
            <Dropdown.Toggle
              id="dropdown-custom-1"
              value={lang}
              className="bg-transparent border text-dark fs-6 ps-3"
            >
              <img src={LangIcon} alt="" height={20} className="me-1" />
              <span className="pe-3"> {langMap[lang]}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <Dropdown.Item eventKey="vi">TIẾNG VIỆT NAM</Dropdown.Item>
              <Dropdown.Item eventKey="en-US">English</Dropdown.Item>

              {/* <Dropdown.Item
                eventKey="ar"
                style={{ fontFamily: "Noto Kufi Arabic" }}
              >
                العربية
              </Dropdown.Item>
              <Dropdown.Item eventKey="ch">Chinese</Dropdown.Item>
              <Dropdown.Item eventKey="fa">فارسی</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="dropdown mx-3">
          <button
            className="btn btn-outline-light text-dark dropdown-toggle fs-6 d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span
              style={{ width: 12, height: 12 }}
              className="rounded-circle bg-success  me-2"
            ></span>
            <span className="pe-3"> {currentUser?.firstName}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link to="/profile" className="dropdown-item small fw-semibold">
                {t('header.menu.profile')}
              </Link>
            </li>
            <li>
              <button
                className="dropdown-item small fw-semibold"
                onClick={() => authService.logout()}
              >
                {t('header.menu.logout')}

              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

const langMap = {
  // ar: "العربية",
 
  vi: 'Vietnamese',
  ["en-US"]: "English"
  // ch: 'Chinese',
  // fa: 'فارسی'
};
