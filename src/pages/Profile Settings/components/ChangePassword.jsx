import { Formik } from "formik";
import React, { useState } from "react";

import * as Yup from "yup";
import AppButton from "../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import authService from "../../../services/auth.service";
import { useTranslation } from "react-i18next";

const schema = Yup.object().shape({
  oldPassword: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
const ChangePassword = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitHandler = async (values, resetForm) => {
    setloading(true);
    if (errorMessage) setErrorMessage(null);
    try {
      const { errors } = await authService.changePassword(values);
      console.log(errors);
      if (errors) {
        setErrorMessage(errors);
      } else {
        resetForm();
        setisSuccess(true);
        setTimeout(() => {
          setisSuccess(false);
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  return (
    <div className="card custom-shadow p-4">
      <h5 className="heading">{t("profile.change_password.title")}</h5>
      <Formik
        validateOnChange={false}
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, { resetForm }) => onSubmitHandler(values, resetForm)}
        validationSchema={schema}>
        {({ handleChange, handleSubmit, errors, values }) => (
          <div className="row gy-2" style={{ maxWidth: 800 }}>
            <div className="col-12 col-md-6">
              <FormGroup
                type="password"
                name="oldPassword"
                onChange={handleChange}
                label={t("profile.change_password.form.currenct_password")}
                errors={errors}
                customError={errorMessage}
                value={values.oldPassword}
              />
            </div>

            <div className="col-12 col-md-6">
              <FormGroup
                type="password"
                name="password"
                onChange={handleChange}
                label={t("profile.change_password.form.new_password")}
                errors={errors}
                value={values.password}
              />
            </div>
            <div className="col-12 col-md-6">
              <FormGroup
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                label={t("profile.change_password.form.confirm_password")}
                errors={errors}
                value={values.confirmPassword}
              />
            </div>
            <div className="w-100"></div>

            <div className="col-12 col-md-6 d-flex align-items-center mb-3">
              <AppButton
                loading={loading}
                className="btn btn-primary w-100"
                onClick={handleSubmit}>
                {t("profile.change_password.form.cta")}
              </AppButton>
            </div>
          </div>
        )}
      </Formik>
      {isSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          {t("profile.change_password.form.success_message")}
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
