import React, { useEffect, useState } from "react";
import PinInput from "react-pin-input";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/images/white-logo.png";

import AppButton from "../../../../components/shared/AppButton/AppButton";
import authService from "../../../../services/auth.service";
import authUtils from "../../../../utils/authUtils";
import { Trans, useTranslation } from "react-i18next";

const RegisterPinVerification = () => {
  const { t } = useTranslation()
  const [pin, setpin] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [pinError, setpinError] = useState(null);
  const [isPinResent, setIsPinResent] = useState(false);

  useEffect(() => {
    if (!location.state) return navigate("/register");
  }, []);

  const validatePin = async () => {
    try {
      const isValid = authUtils.validateEmailPin(pin, location.state.email);
      return isValid;
    } catch (error) {
      return false;
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    setloading(true);
    setpinError(null);

    try {
      if (await validatePin()) {
        const data = { ...location.state };
        data.emailPin = pin;
        data.type = "individual";
        delete data.confirmPassword;
        await authService.register(data);
        await authService.login(data.email, data.portalPassword);
        window.location = "/";
      } else {
        setpinError("Invalid pin");
      }
    } catch (error) { }
    setloading(false);
  };
  const resendPin = async () => {
    setIsPinResent(false);
    setpinError(null);
    try {
      const isSent = await authUtils.sendPinToEmail(location.state.email);
      if (!isSent) {
        setpinError("Your limit exceeded, try again later");
      } else {
        setIsPinResent(true);
      }
    } catch (error) { }
  };

  return (
    <div className="register-wrapper">
      <div>
        <div className="text-center">
          <img src={Logo} alt="Accuindex logo" width={115} />
          <h5>{t('verify_pin.title')}</h5>
          <p style={{ maxWidth: "70%" }} className="text-center mx-auto mt-3">{t('verify_pin.sub-title')}</p>
        </div>
      </div>
      <div>
        <div>
          <h5 className="text-primary fw-bold">{t('verify_pin.heading')}</h5>
          <small className=" mt-2 mb-4">
            {t('verify_pin.description')} {location.state?.email}.
          </small>
          <PinInput
            length={6}
            type="numeric"
            inputMode="number"
            onChange={(value, index) => setpin(value)}
            style={{ padding: "0" }}
            inputStyle={{
              width: 35,
              height: 35,
              borderColor: "#ddd",
            }}
            // inputFocusStyle={{ borderColor: "#333" }}
            // onComplete={(value, index) => {
            //   setpin(value);
            // }}
            onComplete={(value) => setpin(value)}
          />
          {pinError && (
            <small className="text-danger small error-message mt-1">
              {pinError}
            </small>
          )}
          <Trans i18nKey="verify_pin.resend_code">
            <small className="mt-3 fw-semibold">
              Didn't receive code?{" "}
              <button className="btn btn-link px-1 fw-semibold" onClick={resendPin}>
                Resend
              </button>
            </small>
          </Trans>

          <AppButton
            className="btn btn-primary mt-2"
            disabled={pin.length < 6}
            onClick={handleSubmit}
            loading={loading}
          >
            {t('verify_pin.cta')}
          </AppButton>
          {isPinResent && (
            <div className="alert alert-success mt-3" role="alert">
              {t('verify_pin.success_message')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPinVerification;
