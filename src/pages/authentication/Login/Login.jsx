import React, { useEffect, useState } from "react";
import AppButton from "../../../components/shared/AppButton/AppButton";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import authService from "../../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/white-logo.png";

import "./Login.scss";
import { useDispatch } from "react-redux";
import { userLoaded } from "../../../redux/slices/userSlice";
import userService from "../../../services/user.service";

import { ButtonGroup, Dropdown } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import LangIcon from "../../../assets/icons/language.png";
import i18n from 'i18next';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
const Login = () => {
  const { i18n, t } = useTranslation();
  const [lang, setlang] = useState(i18n.language);

  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setloading(true);
    seterror(null);
    try {
      await authService.login(values.email, values.password);
      const [
        userResponse,
        journeyResponse,
        // liveAccountsResponse,
        // demoAccountsResponse,
      ] = await Promise.all([
        userService.getCurrentUserProfile(),
        userService.getCurrentUserJourney(),
        // tradingAccountsService.getLiveAccounts(),
        // tradingAccountsService.getDemoAccounts(),
      ]);
      const user = {
        ...userResponse.result.data,
        journeys: journeyResponse.result && journeyResponse.result.journeys || [{status: false}],
      };
      dispatch(userLoaded(user));
      // dispatch(liveAccountsLoaded(liveAccountsResponse.result));
      // dispatch(demoAccountsLoaded(demoAccountsResponse.result));
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      seterror("Invalid username or passowrd");
    }
    setloading(false);
  };

  useEffect(() => {
    console.log(i18n)
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setlang(lng)
  };
  return (
    <div className="login-wrapper">
      <div>
        <div className="text-center">
          <img src={Logo} alt="Accuindex logo" width={115} />
          <h5>{t('login.title')}</h5>
          <p style={{ maxWidth: "70%" }} className="text-center mx-auto mt-3">{t('login.sub-title')}</p>
        </div>
      </div>
      <div className="card-wrapper">
        <section className="change-lang">
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
              <Dropdown.Item eventKey="en-US">English</Dropdown.Item>
              <Dropdown.Item eventKey="vi">TIẾNG VIỆT NAM</Dropdown.Item>
{/* 
              <Dropdown.Item
                eventKey="ar"
                style={{ fontFamily: "Noto Kufi Arabic" }}
              >
                العربية
              </Dropdown.Item>
              <Dropdown.Item eventKey="ch">Chinese</Dropdown.Item>
              <Dropdown.Item eventKey="fa">فارسی</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </section>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAAB+CAYAAAATBDxAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlENjU3ODUzNzQxRDExRUI5RjJBOEMyNDk4N0Q5RDVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlENjU3ODU0NzQxRDExRUI5RjJBOEMyNDk4N0Q5RDVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUQ2NTc4NTE3NDFEMTFFQjlGMkE4QzI0OTg3RDlENUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUQ2NTc4NTI3NDFEMTFFQjlGMkE4QzI0OTg3RDlENUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4pxGe0AAAQ8UlEQVR42uxdCbBU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"
          alt=""
          style={{ maxHeight: 130 }}
          className="mx-auto mb-5 d-lg-none"
        />

        <div>
          <h5 className="text-primary fw-bold">{t('login.heading')}</h5>
          <small className="text-muted d-block mb-3 mt-1">
            {t('login.description')}
          </small>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnChange={false}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, handleChange }) => (
              <Form>
                <FormGroup
                  placeholder={t('login.form.labels.email')}
                  className="py-3"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  errors={errors}
                  customError={error}
                />
                <FormGroup
                  placeholder={t('login.form.labels.password')}
                  className="py-3"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  errors={errors}
                />
                <Link
                  to="/forgot-password"
                  className="small d-block text-end mt-3"
                >
                  {t('login.form.labels.forgot_password')}
                </Link>

                <AppButton
                  type="submit"
                  className="btn btn-primary px-5 mt-3"
                  loading={loading}
                >
                  {t('login.form.cta')}
                </AppButton>
              </Form>
            )}
          </Formik>
          <div class="form-check mt-4">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              {t('login.form.remember_me')}
            </label>
          </div>
          <Trans i18nKey="login.dont_have_account">
            <div className="mt-4 small">
              Don't have an account?{" "}
              <Link to="/register" className="fw-bold text-primary text-decoration-none">
                Apply for a live account
              </Link>
            </div>
          </Trans>

        </div>
      </div>
    </div>
  );
};

export default Login;
const langMap = {
  ar: "العربية",
  ['en-US']: "English",
  vi: 'Vietnamese',
  ch: 'Chinese',
  fa: 'فارسی'

};