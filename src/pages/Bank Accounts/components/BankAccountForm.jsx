import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import AppButton from "../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
import { CurrencyOptions } from "./../currencies";
import * as Yup from "yup";
import bankAccountService from "../../../services/bankAccount.service";
import TitleWithBackButton from "../../../components/shared/TitleWithBackButton/TitleWithBackButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { useTranslation } from "react-i18next";
const bankSchema = Yup.object().shape({
  accountHolderName: Yup.string().required(),
  beneficiaryBankName: Yup.string().required(),
  beneficiaryBankAddress: Yup.string().required(),
  ibanNumber: Yup.string().required(),
  currency: Yup.string().required(),
  accountNumber: Yup.string().required(),
  swiftCode: Yup.string().required(),
});

const BankAccountForm = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [bank, setbank] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (params.state == "update") {
      setbank(location.state.bank);
    }
  }, []);

  const onSubmitHnalder = async (values) => {
    setloading(true);
    try {
      let data;
      if (params.state == "update") {
        const updatedValues = formatBankData(values);

        data = await bankAccountService.updateBankAccount(
          location.state.bank.id,
          updatedValues
        );
      } else {
        data = await bankAccountService.addBankAccount(values);
      }

      navigate("/bank-accounts");
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const formatBankData = (values) => {
    let data = { ...values };
    return _.omit(data, [
      "__v",
      "id",
      "_id",
      "updatedAt",
      "recordId",
      "customerId",
      "createdAt",
    ]);
  };
  return (
    <div>
      <TitleWithBackButton
        path="/bank-accounts"
        name={t("bank_accounts.go_back")}
      />
      <div className="card px-3 py-4  p-lg-4">
        <Formik
          validationSchema={bankSchema}
          enableReinitialize
          validateOnChange={false}
          initialValues={
            bank || {
              accountHolderName: "",
              beneficiaryBankName: "",
              beneficiaryBankAddress: "",
              ibanNumber: "",
              currency: "",
              accountNumber: "",
              swiftCode: "",
            }
          }
          onSubmit={(values) => onSubmitHnalder(values)}>
          {({ handleChange, handleSubmit, errors, values }) => (
            <Form>
              <div
                className="row w-100 gx-0 gx-md-4 gy-2 mx-auto mx-lg-0"
                style={{ maxWidth: 800 }}>
                <div className="col-12 col-md-6">
                  <FormGroup
                    label={t("bank_accounts.form.labels.holder_name")}
                    name="accountHolderName"
                    onChange={handleChange}
                    errors={errors}
                    value={values.accountHolderName}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup
                    label={t("bank_accounts.form.labels.beneficiary_name")}
                    name="beneficiaryBankName"
                    onChange={handleChange}
                    errors={errors}
                    value={values.beneficiaryBankName}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup
                    label={t("bank_accounts.form.labels.iban")}
                    name="ibanNumber"
                    onChange={handleChange}
                    errors={errors}
                    value={values.ibanNumber}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup
                    label={t("bank_accounts.form.labels.bank_address")}
                    name="beneficiaryBankAddress"
                    onChange={handleChange}
                    errors={errors}
                    value={values.beneficiaryBankAddress}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <SelectGroup
                    options={CurrencyOptions}
                    name="currency"
                    label={t("bank_accounts.form.labels.currency")}
                    onChange={handleChange}
                    errors={errors}
                    value={values.currency}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup
                    label={t("bank_accounts.form.labels.account_number")}
                    name="accountNumber"
                    onChange={handleChange}
                    errors={errors}
                    value={values.accountNumber}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup
                    label={t("bank_accounts.form.labels.swift")}
                    name="swiftCode"
                    onChange={handleChange}
                    errors={errors}
                    value={values.swiftCode}
                  />
                </div>
                <div className="w-100"></div>
                <div className="col-12 col-md-6">
                  <AppButton
                    loading={loading}
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}>
                    {params.state == "update"
                      ? t("bank_accounts.form.actions.update")
                      : t("bank_accounts.form.actions.submit")}
                  </AppButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BankAccountForm;
