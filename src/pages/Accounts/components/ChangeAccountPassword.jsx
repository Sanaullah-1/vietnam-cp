import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppButton from "../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import tradingAccountsService from "../../../services/tradingAccounts.service";
import { useTranslation } from "react-i18next";
const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
function ChangeAccountPassword({ show, onClose, selectedAccount }) {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);

  const onSubmitHandler = async (values) => {
    setloading(true);
    if (errorMessage) seterrorMessage(null);
    const data = { ...values };
    data.mt5Account = selectedAccount.mt5Account.toString();
    try {
      const isChanged = await tradingAccountsService.changeAccountPassword(
        selectedAccount._id,
        data
      );
      if (isChanged) {
        toast.success("Password changed!");
        onClose();
      } else {
        seterrorMessage("Password is weak");
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h6 fw-bold">
            {t("change_password.title")} ({selectedAccount?.mt5Account})
          </Modal.Title>
        </Modal.Header>

        <Formik
          validationSchema={changePasswordSchema}
          initialValues={{
            password: "",
            confirmPassword: "",
            type: "main"
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}>
          {({ handleChange, errors, handleSubmit, setFieldValue }) => (
            <>
              <Modal.Body>
                <Form>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        {t("new_account.form.platform")}
                      </label>
                      <div className="d-flex">
                        <label
                          className="form-check-inline border px-3 py-3 flex-grow-1 "
                          htmlFor="typeOption">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="typeOption"
                            value="main"
                            defaultChecked
                            onChange={(e) => {
                              setFieldValue("type", "");
                              handleChange(e);
                            }}
                          />
                          <span className="form-check-label ms-3">
                            {t("change_password.form.master")} 5
                          </span>
                        </label>
                        <label
                          className="form-check-inline border px-3 py-3 flex-grow-1 me-0"
                          htmlFor="investorOption">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="investorOption"
                            value="investor"
                            onChange={(e) => {
                              setFieldValue("type", "");
                              handleChange(e);
                            }}
                          />
                          <span className="form-check-label ms-3">
                            {t("change_password.form.investor")} 4
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <FormGroup
                        type="password"
                        label={t("change_password.form.new_password")}
                        onChange={(e) => {
                          if (errorMessage) seterrorMessage(null);
                          handleChange(e);
                        }}
                        errors={errors}
                        name="password"
                        customError={errorMessage}
                      />
                    </div>
                    <div className="col-12">
                      <FormGroup
                        type="password"
                        label={t("change_password.form.confirm_password")}
                        onChange={handleChange}
                        errors={errors}
                        name="confirmPassword"
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <AppButton
                  className="btn btn-primary"
                  loading={loading}
                  onClick={handleSubmit}>
                  {t("change_password.form.cta")}
                </AppButton>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ChangeAccountPassword;
