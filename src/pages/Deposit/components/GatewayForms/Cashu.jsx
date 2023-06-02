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

const cashuSchema = Yup.object().shape({
  accountNumber: Yup.string().required(),
  amount: Yup.number().required().min(50),
});
const CashuForm = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);

  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  const onSubmitHandler = async (values) => {
    setloading(true);
    try {
      const { result } = await paymentService.getCashuCheckoutId({
        accountNumber: values.accountNumber,
        applicationId: liveAccounts.find(
          (acc) => acc.mt5Account == values.accountNumber
        )._id,
        amount: values.amount.toString(),
      });
      const cashuURl = import.meta.env.VITE_CASHU_URL; // should comde from env
      openWindowWithPost(cashuURl, {
        ["Transaction_Code"]: result.checkoutId,
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
        validationSchema={cashuSchema}
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

export default CashuForm;
