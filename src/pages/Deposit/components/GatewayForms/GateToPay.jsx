import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import paymentService from "../../../../services/payment.service";
import { useTranslation } from "react-i18next";

const gateToPaySchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  cardId: Yup.string().required(),
  amount: Yup.number().required().min(50),
});
const GateToPayForm = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);

  const [gateToPayCards, setGateToPayCards] = useState([]);
  const [isSuccess, setisSuccess] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    (async function () {
      setListingLoading(true);
      try {
        const { result } = await paymentService.getGetToPayCards();
        setGateToPayCards(result.cards);
      } catch (error) {
        alert("faild to load my gatetopay cards");
      }
      setListingLoading(false);
    })();
  }, []);

  const onSubmitHandler = async (values) => {
    reset();
    setloading(true);
    try {
      const cardExpiry = currentUser.accuPay.cardExpiry;
      const response = await paymentService.payWithGateToPay({
        accountNumber: values.accountNumber,
        applicationId: liveAccounts.find(
          (acc) => acc.mt5Account == values.accountNumber
        )._id,
        amount: values.amount.toString(),
        cardId: values.cardId,
        cardExpiry,
      });
      if (response.isSuccess) {
        setisSuccess(true);
      }
    } catch (error) {
      console.log(error.response);
      seterrorMessage(error.response.data.message);
    }
    setloading(false);
  };
  const reset = () => {
    if (errorMessage) {
      seterrorMessage(null);
    }
    if (isSuccess) setisSuccess(false);
  };
  return (
    <div>
      <Formik
        validateOnChange={false}
        validationSchema={gateToPaySchema}
        initialValues={{
          accountNumber: "",
          amount: "",
          cardId: "",
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
                    inputMode="numeric"
                    placeholder="0.00"
                    name="amount"
                    errors={errors}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <SelectGroup
                    label={t("deposit.forms.card_number")}
                    options={gateToPayCards}
                    valueText="cardId"
                    titleText="cardNumber"
                    name="cardId"
                    errors={errors}
                    onChange={handleChange}
                    loading={listingLoading}
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
            {isSuccess && (
              <div className="alert alert-success mt-3" role="alert">
                Your fund is successfull!
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

export default GateToPayForm;
