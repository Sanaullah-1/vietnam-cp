import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import paymentService from "../../../../services/payment.service";
import { useTranslation } from "react-i18next";

const skrillSchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  amount: Yup.number().required().min(50),
});

const SkrillForm = ({ onIframeUrlLoaded }) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [selectedAccount, setselectedAccount] = useState(null);
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
      const { result } = await paymentService.getSkrillPaymentIframe({
        accountNumber: values.accountNumber,
        applicationId: liveAccounts.find(
          (acc) => acc.mt5Account == values.accountNumber
        )._id,
        amount: values.amount.toString(),
        payment_method: "skrill",
        gateway: "skrill",
      });
      onIframeUrlLoaded(
        `${import.meta.env.VITE_SKRILL_URL}?sid=${result.sid}`
      );
    } catch (error) {}
    setloading(false);
  };
  return (
    <div>
      <Formik
        validateOnChange={false}
        enableReinitialize
        validationSchema={skrillSchema}
        initialValues={{
          accountNumber: selectedAccount || "",
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

export default SkrillForm;
