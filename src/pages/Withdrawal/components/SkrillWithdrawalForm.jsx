import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import AppButton from "../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
import bankAccountService from "../../../services/bankAccount.service";
import transactionsService from "../../../services/transactions.service";
import { useTranslation } from "react-i18next";
// import AppButton from "../../../../components/shared/AppButton/AppButton";
// import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
// import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";

const commonWithdrawalSchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  amount: Yup.number().min(100).required(),
  walletId: Yup.string().required(),
  note: Yup.string(),
});

const SkrillWithdrawalForm = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const [isRequestSuccess, setisRequestSuccess] = useState(false);
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  const [searchParams] = useSearchParams();

  const onSubmitHandler = async (values, resetForm) => {
    setloading(true);
    reset();
    try {
      const { isSuccess, message } =
        await transactionsService.withdrawalRequest({
          type: "WITHDRAWAL",
          amount: values.amount.toString(),
          note: values.note,
          transactionParties: {
            gateway: "SKRILL",
            account: values.accountNumber,
            applicationId: liveAccounts.find(
              (acc) => acc.mt5Account == values.accountNumber
            )._id,
            isIbPortal: false,
            walletId: values.walletId,
          },
          declaration: "I confirm, the bank account I added is correct",
        });
      if (isSuccess) {
        setisRequestSuccess(true);
        resetForm();
      } else if (message) seterrorMessage(message);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  const reset = () => {
    if (errorMessage) {
      seterrorMessage(null);
    }
    if (isRequestSuccess) setisRequestSuccess(false);
  };
  return (
    <div>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={commonWithdrawalSchema}
        initialValues={{
          accountNumber: "",
          amount: "",
          walletId: "",
          note: "",
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values, resetForm);
        }}
      >
        {({ handleChange, errors, handleSubmit, values }) => (
          <>
            <Form>
              <div className="row">
                <div className="col-12">
                  <SelectGroup
                    label={t("withdrawal.form.select_account")}
                    options={liveAccounts ?? []}
                    valueText="mt5Account"
                    titleText="mt5Account"
                    name="accountNumber"
                    errors={errors}
                    onChange={handleChange}
                    value={values.accountNumber}
                  />
                </div>
                <div className="col-12">
                  <FormGroup
                    label={t("withdrawal.form.amount")}
                    type="number"
                    inputMode="numeric"
                    placeholder="0.00"
                    name="amount"
                    errors={errors}
                    onChange={handleChange}
                    value={values.amount}
                  />
                </div>
                <div className="col-12">
                  <FormGroup
                    label={t("withdrawal.form.wallet_id")}
                    name="walletId"
                    errors={errors}
                    onChange={handleChange}
                    value={values.walletId}
                  />
                </div>

                <div className="col-12">
                  <FormGroup
                    label={t("withdrawal.form.note")}
                    name="note"
                    errors={errors}
                    onChange={handleChange}
                    value={values.note}
                  />
                </div>
              </div>
              <AppButton
                loading={loading}
                className="btn btn-primary w-100 mt-4"
                onClick={handleSubmit}
              >
                {t("withdrawal.form.cta")}
              </AppButton>
            </Form>
            {isRequestSuccess && (
              <div className="alert alert-success mt-3" role="alert">
                {t("withdrawal.form.success_message")}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default SkrillWithdrawalForm;
