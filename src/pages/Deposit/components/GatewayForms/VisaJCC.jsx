import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import paymentService from "../../../../services/payment.service";
import { openWindowWithPost } from "../../utils/depositUtils";
import { useTranslation } from "react-i18next";

const visaJCCSchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  amount: Yup.number().required().min(50),
});
const VisaJCCFrom = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);

  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  const onSubmitHandler = async (values) => {
    setloading(true);
    try {
      const { result } = await paymentService.generateVisaGccSignature({
        accountNumber: values.accountNumber,
        applicationId: liveAccounts.find(
          (acc) => acc.mt5Account == values.accountNumber
        )._id,
        amount: values.amount.toString(),
      }); // should comde from env
      openWindowWithPost(import.meta.env.VITE_JCC_URL, {
        Version: import.meta.env.VITE_JCC_VERSION,
        MerID: import.meta.env.VITE_JCC_MERID,
        AcqID: import.meta.env.VITE_JCC_ACQID,
        MerRespURL: import.meta.env.VITE_JCC_MERRESPURL,
        PurchaseAmt: result.formatedAmt,
        PurchaseCurrency: import.meta.env.VITE_JCC_CURRENCY_ISO_USD,
        PurchaseCurrencyExponent: 2,
        OrderID: result.orderId,
        CaptureFlag: import.meta.env.VITE_JCC_CAPTURE_FLAG,
        Signature: result.signature,
        SignatureMethod: import.meta.env.VITE_JCC_SIGNATUREMETHOD,
      });
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  return (
    <div>
      <Formik
        validateOnChange={false}
        validationSchema={visaJCCSchema}
        initialValues={{
          accountNumber: "",
          amount: "",
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

export default VisaJCCFrom;
