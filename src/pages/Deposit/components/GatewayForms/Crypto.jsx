import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import paymentService from "../../../../services/payment.service";
import QRCode from "qrcode.react";
import CopyIcon from "../../../../assets/icons/copy.png";
import { useTranslation } from "react-i18next";
const cryptoSchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  amount: Yup.number().required().min(50),
  paymentCurrency: Yup.string().required(),
  description: Yup.string().required(),
});

const CryptoForm = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [scriptData, setScriptData] = useState(null);
  const [wallet, setWallet] = useState(null);
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );
  const userProfile = useSelector(
    (state) => state.user
  );

  const onSubmitHandler = async (values) => {
    setloading(true);
    try {
      const { result, isSuccess } = await paymentService.hayvnDeposit({
        accountNumber: values.accountNumber,
        applicationId: liveAccounts.find(
          (acc) => acc.mt5Account == values.accountNumber
        )._id,
        amount: values.amount.toString(),
        notes: values.description,
        paymentCurrency: values.paymentCurrency,
      });
      if (isSuccess) {
        setWallet(result);
      }
    } catch (error) { }
    setloading(false);
  };

  if (wallet)
    return (
      <div className="border text-center p-3">
        <div className="fw-bold">
          {wallet.paymentCurrency} <b className="text-danger">(TRC - 20)</b>:{" "}
          {wallet.paymentAmount}
        </div>
        <QRCode
          id="qr-gen"
          value={wallet.address}
          size={290}
          level={"H"}
          includeMargin={true}
        />
        <div className="border p-2 mb-2 d-flex align-items-center justify-content-between px-2 text-break">
          {wallet.address}
          <img
            src={CopyIcon}
            width={14}
            className="pointer"
            onClick={() => navigator.clipboard.writeText(wallet.address)}
          />
        </div>
        <small className="text-warning">
          Please complete this deposit within 15 minutes
        </small>
      </div>
    );
  return (
    <div>
      <Formik
        validateOnChange={false}
        validationSchema={cryptoSchema}
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
              <p className="mb-4">
                {t("deposit.forms.crypto_message_prefix")}{" "}
                <span className="text-danger fw-bold text-decoration-underline">
                  TRC20
                </span>{" "}
                {t("deposit.forms.crypto_message_suffix")}
              </p>
              {userProfile && userProfile.countryResidency === 'Iran' && <div container spacing={3} className='pt-2'>
                <div item md={6} className="pt-1">
                  Please do not deposit from Nobitex, all <strong>Nobitex deposits will be rejected.</strong>
                </div>
                <div item md={6} className="pt-1 " style={{textAlign: 'end'}}>
                  لطفا از نوبیتکس واریز نکنید،تمام واریز های 
                  &nbsp;<strong>نوبیتکس رد می شود </strong>&nbsp;
                </div>
              </div>}
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
                <div className="col-12">
                  <SelectGroup
                    label={t("deposit.forms.payment_cuurency")}
                    options={cryptoCurrency}
                    name="paymentCurrency"
                    errors={errors}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <FormGroup
                    label={t("deposit.forms.description")}
                    name="description"
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

export default CryptoForm;
const cryptoCurrency = ["ETH", "BTC", "USDT"].map((c) => ({
  name: c,
  value: c,
}));
