import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectGroup from "../../components/shared/SelectGroup/SelectGroup";
import * as Yup from "yup";
import FormGroup from "../../components/shared/FormGroup/FormGroup";
import tradingAccountsService from "../../services/tradingAccounts.service";
import transactionsService from "../../services/transactions.service";
import AppButton from "../../components/shared/AppButton/AppButton";
import { useTranslation } from "react-i18next";
const internalTransferSchema = Yup.object().shape({
  fromAccount: Yup.string().required(),
  toAccount: Yup.string().required(),
  amount: Yup.number().required(),
  note: Yup.string(),
});
const InteralTransfer = () => {
  const { t } = useTranslation();
  const [accountLoading, setAccountsLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const [platform, setplatform] = useState("MT5");

  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  useEffect(() => {
    (async function () {
      if (!liveAccounts) {
        setAccountsLoading(true);
        await tradingAccountsService.fetchLiveAccountsAndStore();
        setAccountsLoading(false);
      }
    })();
  }, []);

  const onSubmitHandler = async (values) => {
    reset();
    setloading(true);
    try {
      const { result, isSuccess, errors } =
        await transactionsService.internalTransfer({
          type: "INTERNAL_TRANSFER",
          amount: values.amount.toString(),
          note: values.note,
          transactionParties: {
            applicationId: liveAccounts.find(
              (acc) => acc.mt5Account == values.fromAccount
            )._id,
            fromAccount: values.fromAccount,
            toAccount: values.toAccount,
            applicationTo: liveAccounts.find(
              (acc) => acc.mt5Account == values.toAccount
            )._id,
          },
        });
      if (isSuccess) {
        await tradingAccountsService.fetchLiveAccountsAndStore();
        setisSuccess(true);
      }
      if (errors) seterrorMessage(errors);
    } catch (error) {
      console.log(error);
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
    <>
      <section className="section">
        <h5 className="heading">{t("internal_transfer.title")}</h5>
        <div className="card custom-shadow px-3 px-lg-5 py-4 py-lg-5">
          <div className="mx-auto w-100" style={{ maxWidth: 500 }}>
            <Formik
              initialValues={{
                fromAccount: "",
                toAccount: "",
                amount: "",
                note: "",
              }}
              validationSchema={internalTransferSchema}
              onSubmit={(values) => onSubmitHandler(values)}
            >
              {({ errors, handleChange, handleSubmit, values, resetForm }) => (
                <div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      {t("internal_transfer.form.platform")}
                    </label>
                    <div className="d-flex">
                      <label
                        className="form-check-inline border px-3 py-3 flex-grow-1 "
                        htmlFor="mt5Option"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="platform"
                          id="mt5Option"
                          value="MT5"
                          defaultChecked
                          onChange={(e) => {
                            setplatform(e.target.value);
                            resetForm();
                          }}
                        />
                        <span className="form-check-label ms-3">MT5</span>
                      </label>
                      <label
                        className="form-check-inline border px-3 py-3 flex-grow-1 me-0"
                        htmlFor="mt4Option"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="platform"
                          id="mt4Option"
                          value="MT4"
                          onChange={(e) => {
                            setplatform(e.target.value);
                            resetForm();
                          }}
                        />
                        <span className="form-check-label ms-3">MT4</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <SelectGroup
                      label={t("internal_transfer.form.from_account")}
                      options={
                        liveAccounts?.filter(
                          (acc) => acc.platform == platform
                        ) ?? []
                      }
                      valueText="mt5Account"
                      name="fromAccount"
                      generateTitleText={(acc) =>
                        `${acc.mt5Account}  (${acc.balance} USD)`
                      }
                      errors={errors}
                      onChange={handleChange}
                      loading={accountLoading}
                    />
                  </div>
                  <div className="mb-3">
                    <SelectGroup
                      label={t("internal_transfer.form.to_account")}
                      options={
                        liveAccounts
                          ?.filter(
                            (acc) => acc.mt5Account != values.fromAccount
                          )
                          .filter((acc) => acc.platform == platform) ?? []
                      }
                      valueText="mt5Account"
                      generateTitleText={(acc) =>
                        `${acc.mt5Account}  (${acc.balance} USD)`
                      }
                      name="toAccount"
                      disabled={values.fromAccount == ""}
                      errors={errors}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="disabledSelect" className="form-label">
                      {t("internal_transfer.form.transfer_amount")}
                    </label>
                    <div className="input-group">
                      <span
                        className="input-group-text bg-transparent"
                        id="basic-addon1"
                      >
                        USD
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        className="form-control flex-grow-1"
                        aria-label="Text input with dropdown button"
                        placeholder="0.00"
                        name="amount"
                        onChange={handleChange}
                      />
                    </div>

                    {errors.amount && (
                      <small className="text-danger small error-message">
                        {errors.amount}
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <FormGroup
                      label={t("internal_transfer.form.notes")}
                      name="note"
                      errors={errors}
                      onChange={handleChange}
                    />
                  </div>

                  <AppButton
                    loading={loading}
                    className="btn btn-primary w-100 mt-2 py-2"
                    onClick={handleSubmit}
                  >
                    {t("internal_transfer.form.cta")}
                  </AppButton>
                  {isSuccess && (
                    <div className="alert alert-success mt-3" role="alert">
                      {t("internal_transfer.form.success_message")}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default InteralTransfer;
