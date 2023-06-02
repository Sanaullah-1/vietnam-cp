import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import paymentService from "../../../../services/payment.service";
import { useTranslation } from "react-i18next";

const visaMasterSchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  amount: Yup.number().required().min(50),
});

const VisaMasterForm = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [scriptData, setScriptData] = useState(null);
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  const onSubmitHandler = async (values) => {
    setloading(true);
    try {
      const { result } = await paymentService.getVisaMasterCheckoutId({
        accountNumber: values.accountNumber,
        applicationId: liveAccounts.find(
          (acc) => acc.mt5Account == values.accountNumber
        )._id,
        amount: values.amount.toString(),
      });
      setScriptData({
        src: `${import.meta.env.VITE_VISA_MASTER_URL}?checkoutId=${result.checkoutId}`,
        redirect: result.redirect,
      });
    } catch (error) {}
    setloading(false);
  };

  if (scriptData?.redirect)
    return (
      <div className="">
        <Helmet>
          <script
            id="test-script"
            type="text/javascript"
            async={false}
            src={scriptData.src}
            // onLoad={() => setLoaded(true)}
          ></script>
        </Helmet>
        <form
          style={{
            minHeight: "10rem",
          }}
          target="_blank"
          action={scriptData.redirect}
          className="paymentWidgets"
          data-brands="VISA MASTER"
        ></form>
      </div>
    );
  return (
    <div>
      <Formik
        validateOnChange={false}
        validationSchema={visaMasterSchema}
        initialValues={{
          accountNumber: "",
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

export default VisaMasterForm;
