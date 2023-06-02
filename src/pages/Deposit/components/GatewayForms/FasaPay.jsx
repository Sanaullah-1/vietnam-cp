import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import { openWindowWithPost } from "../../utils/depositUtils";
import { useTranslation } from "react-i18next";

const fasaPaySchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  amount: Yup.number().required().min(50),
  payee: Yup.string().required(),
});

const FasaPayFrom = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [selectedAccount, setselectedAccount] = useState(null);

  const currentUser = useSelector((state) => state.user);
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const account = searchParams.get("account");
    if (account) {
      setselectedAccount(account);
    }
  }, []);

  const onSubmitHandler = async (values) => {
    setloading(true);
    try {
      // should comde from env
      openWindowWithPost(import.meta.env.VITE_FASAPAY_URL, {
        ["fp_acc"]: import.meta.env.VITE_FASAPAY_ACCOUNT,
        ["fp_acc_from"]: values.payee,
        ["fp_store"]: "Accuindex EU Limited",
        ["fp_item"]: `Deposit of ${values.amount}`,
        ["fp_amnt"]: values.amount,
        ["fp_currency"]: "USD",
        ["fp_fee_mode"]: "FiR",
        ["fp_success_url"]: `${import.meta.env.VITE_REGISTER_URL}/Deposit`,
        ["fp_success_method"]: "GET",
        ["fp_fail_url"]: `${import.meta.env.VITE_REGISTER_URL}/Deposit`,
        ["fp_fail_method"]: "GET",
        ["fp_status_url"]: `${import.meta.env.VITE_DEPOSIT_API_BASE_URL}/fasapay/status_update`,
        ["fp_status_method"]: "POST",
        ["a_Id"]: liveAccounts.find(
          (acc) => acc.mt5Account == values.accountNumber
        )._id,
        ["c_Id"]: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  return (
    <div>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={fasaPaySchema}
        initialValues={{
          accountNumber: selectedAccount || "",
          amount: "",
          payee: "",
        }}
        onSubmit={(values) => {
          onSubmitHandler(values);
        }}
      >
        {({ handleChange, errors, handleSubmit, values }) => (
          <>
            <Form>
              <div className="row">
                <div className="col-12">
                  <SelectGroup
                    label={t("deposit.forms.select_account")}
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
                    label={t("deposit.forms.amount")}
                    type="number"
                    inputMode="numeric"
                    placeholder="0.00"
                    name="amount"
                    errors={errors}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <FormGroup
                    label={t("deposit.forms.account_payee")}
                    name="payee"
                    errors={errors}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <AppButton
                loading={loading}
                className="btn btn-primary w-100 mt-4"
                onClick={handleSubmit}
              >
                {t("deposit.forms.cta")}
              </AppButton>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FasaPayFrom;
