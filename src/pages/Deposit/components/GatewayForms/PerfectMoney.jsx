import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import paymentService from "../../../../services/payment.service";
import { openWindowWithPost } from "../../utils/depositUtils";
import { useTranslation } from "react-i18next";

const perfectMoneySchema = Yup.object().shape({
  payeeAccount: Yup.string().required(),
  accountNumber: Yup.string().required(),
  amount: Yup.number().required().min(50),
  notes: Yup.string().required(),
});
const PerfectMoneyForm = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [conversionRates, setconversionRates] = useState(null);
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  useEffect(() => {
    (async function () {
      try {
        const { result } = await paymentService.getConversionRates();
        setconversionRates(result);
      } catch (error) {}
    })();
  }, []);

  const onSubmitHandler = async (values) => {
    setloading(true);
    try {
      const payload = getRequestPayload(values);
      console.log("payload", payload);
      const { result } = await paymentService.createPerfectMoneyOrder(payload);
      console.log("result ", result);

      const perfectMoneyURL = "https://perfectmoney.com/api/step1.asp";
      // should comde from env
      openWindowWithPost(perfectMoneyURL, {
        PAYEE_ACCOUNT: values.payeeAccount,
        PAYEE_NAME: "Accuindex EU Limited",
        PAYMENT_ID: result.orderId,
        PAYMENT_AMOUNT: getConvertedAmount(values),
        PAYMENT_UNITS: payeeAccountList.find(
          (p) => p.accountNo == values.payeeAccount
        ).currency,
        STATUS_URL: `${import.meta.env.VITE_DEPOSIT_API_BASE_URL}/perfectmoney/success`,
        PAYMENT_URL: `${import.meta.env.VITE_DEPOSIT_API_BASE_URL}/perfectmoney/cancel`,
        PAYMENT_URL_METHOD: "LINK",
        NOPAYMENT_URL: `${import.meta.env.VITE_DEPOSIT_API_BASE_URL}/perfectmoney/cancel`,
      });
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const getRequestPayload = (values) => {
    return {
      type: "DEPOSIT",
      amount: values.amount,
      note: values.notes,
      paymentGateway: "Perfect Money",
      payeeAccount: values.payeeAccount,
      payeeName: "Accuindex",
      currency: payeeAccountList.find((p) => p.accountNo == values.payeeAccount)
        .currency,
      conversionRate:
        conversionRates[
          payeeAccountList.findIndex((p) => p.accountNo == values.payeeAccount)
        ],
      conversionAmount: getConvertedAmount(values).toString(),
      account: values.accountNumber,
      accountNumber: values.accountNumber,
      conversionTime: conversionRates[0],
      accountNumber: values.accountNumber,
      applicationId: liveAccounts.find(
        (acc) => acc.mt5Account == values.accountNumber
      )._id,
    };
  };
  return (
    <div>
      <Formik
        validationSchema={perfectMoneySchema}
        validateOnChange={false}
        initialValues={{
          payeeAccount: "",
          accountNumber: "",
          amount: "",
          notes: "",
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
                    label={t("deposit.forms.account_payee")}
                    options={payeeAccountList}
                    valueText="accountNo"
                    name="payeeAccount"
                    generateTitleText={(op) =>
                      `${op.accountNo} - ${op.currency}`
                    }
                    errors={errors}
                    onChange={handleChange}
                  />
                </div>
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
                <div className="col-12 mb-3">
                  <FormGroup
                    label={t("deposit.forms.amount")}
                    type="number"
                    inputMode="numeric"
                    placeholder="0.00"
                    name="amount"
                    errors={errors}
                    value={values.amount}
                    onChange={handleChange}
                  />
                  {values.payeeAccount && values.amount && (
                    <small className="text-success">
                      {t("deposit.forms.converted_amount")}:{" "}
                      {getConvertedAmount(values)}
                    </small>
                  )}
                </div>
                <div className="col-12">
                  <FormGroup
                    label={t("deposit.forms.notes")}
                    name="notes"
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

  function getConvertedAmount({ amount = 0, payeeAccount }) {
    console.log("got called", amount, payeeAccount);
    const payeeIndex = payeeAccountList.findIndex(
      (p) => p.accountNo == payeeAccount
    );
    if (payeeIndex == 0) return parseFloat(amount).toFixed(2); // is USD

    const calculatedValue =
      parseFloat(amount) * parseFloat(conversionRates[payeeIndex]);

    if (payeeAccount == "E26269084") return calculatedValue.toFixed(2);
    return calculatedValue.toFixed(4);
  }
};

export default PerfectMoneyForm;

const payeeAccountList = [
  { accountNo: "U25597309", currency: "USD", rate: 1 },
  { accountNo: "E26269084", currency: "EUR", rate: 0 },
  { accountNo: "G26990893", currency: "OAU", rate: 0 },
  { accountNo: "B27150216", currency: "BTC", rate: 0 },
]; //{ accountNo: 'B27150216', currency: 'BTC', rate: 0 },
