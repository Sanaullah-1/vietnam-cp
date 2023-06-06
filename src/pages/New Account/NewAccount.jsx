import React, { useEffect, useState } from "react";
import UsFlag from "../../assets/icons/us-flag.png";
import CheckIcon from "../../assets/icons/check-mark.png";
import * as Yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TitleWithBackButton from "../../components/shared/TitleWithBackButton/TitleWithBackButton";
import classNames from "classnames";
import { Formik, useFormik } from "formik";
import tradingAccountsService from "../../services/tradingAccounts.service";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "../../components/shared/FormGroup/FormGroup";
import AppButton from "../../components/shared/AppButton/AppButton";
import { toast } from "react-toastify";
import { Trans, useTranslation } from "react-i18next";
import { AccountTypeDetails } from "../../utils/constants";
import './NewAccount.scss'
const NewAccount = (props) => {
  const { t } = useTranslation();
  const accounts = useSelector((state) => state.tradingAccounts);
  const currentUser = useSelector((state) => state.user);

  const [typesLoading, setTypesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const [accountTypes, setAccountTypes] = useState([]);
  const [searchParams, setSearhParams] = useSearchParams();
  const isDemoAccount = searchParams.get("type") == "demo";
  const accountTypeKey = isDemoAccount ? "accountType" : "accountTypeId";
  const [selected, setSelected] = useState({})
  const accountSchema = Yup.object().shape({
    [accountTypeKey]: Yup.string().required("Please select account type"),
    platform: Yup.string().required(),
    portalPassword: Yup.string().required("Choose password for your account"),
    currency: Yup.string(),
    balance: Yup.string(),
    reason: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      accountTypeKey: ""
    },
    onSubmit: values => {
      console.log(values);
    },
  });
  useEffect(() => {
    (async function () {
      setTypesLoading(true);
      try {
        const { result } = await tradingAccountsService.getAccountTypes(
          searchParams.get("type")
        );
        setAccountTypes(result);
        console.log(result, "----------------------", currentUser);
      } catch (error) {
        console.log(error);
      }
      setTypesLoading(false);
    })();
  }, []);
  useEffect(() => {
    console.log('Form values changed:', formik.values);

  }, [formik.values])
  const submitHandler = async (values) => {
    seterrorMessage(null);
    if (isMaxinmumReached()) {
      makeRequestHandler(values);
      return;
    }
    setLoading(true);
    try {
      console.log("cale");
      const type = searchParams.get("type");
      const data = { ...values };
      data.confirmPortalPassword = data.portalPassword;
      if (isDemoAccount && data.balance == "") delete data.balance;

      const { result } = await tradingAccountsService.createNewAccount(
        type,
        data
      );
      toast.success(`${type} account created successfully!`);
      console.log("where here === = = == = = ");
      navigate(-1);
      console.log(result);
    } catch (error) {
      if (error.response.data.errors.includes("password")) {
        seterrorMessage("Password is weak");
      }
    }
    setLoading(false);
  };
  const makeRequestHandler = async (values) => {
    setLoading(true);
    try {
      const type = searchParams.get("type");
      const data = { ...values };
      data.type = type;

      if (isDemoAccount && data.balance == "") delete data.balance;

      const { result } = await tradingAccountsService.createAccountRequest(
        data
      );

      toast.success(`${type} account requested successfully!`);
      navigate(-1);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const isMaxinmumReached = () => {
    const type = searchParams.get("type");
    if (type == "live") return accounts.liveAccounts?.length >= 3;
    return accounts.demoAccounts?.length >= 3;
  };
  if (!currentUser.idUploaded && currentUser.kycStatus != 4 && !isDemoAccount) {
    return (
      <div className="alert alert-info my-3" role="alert">
        <Trans i18nKey="new_account.not_verified">
          Your account is not verified, please{" "}
          <Link to="/my-documents">upload your ID</Link>.
        </Trans>
      </div>
    );
  }
  console.log(formik.values)
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12">
        <section className="section">
          <TitleWithBackButton
            title={t("new_account.title", { context: searchParams.get("type") })}
            path="/accounts"
            name={t("new_account.go_back")}
          />
        </section>
      </div>
      <div className="col-lg-6 col-sm-12 h-100">
        <section className="section">
         
          <Formik
            validateOnChange={false}
            validationSchema={accountSchema}
            initialValues={{
              platform: "MT5",
              [accountTypeKey]: "",
              portalPassword: "",
              currency: "USD",
              ...(isDemoAccount && { balance: "" }),
              ...(isMaxinmumReached() && { reason: "" }),
            }}
            onSubmit={(values) => {
              console.log("00");
              submitHandler(values);
            }}>
            {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
              <div className="card custom-shadow py-5">
                <div className="col-12 col-xl-8 mx-auto" style={{ maxWidth: 900 }}>
                  {isMaxinmumReached() && (
                    <div className="alert alert-info mb-3" role="alert">
                      {t("new_account.max_reached")}
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      {t("new_account.form.platform")}
                    </label>
                    <div className="d-flex">
                      <label
                        className="form-check-inline border px-3 py-3 flex-grow-1 "
                        htmlFor="mt5Option">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="platform"
                          id="mt5Option"
                          value="MT5"
                          defaultChecked
                          onChange={(e) => {
                            setFieldValue(accountTypeKey, "");
                            handleChange(e);
                          }}
                        />
                        <span className="form-check-label ms-3">
                          {t("new_account.form.metatader")} 5
                        </span>
                      </label>
                      <label
                        className="form-check-inline border px-3 py-3 flex-grow-1 me-0"
                        htmlFor="mt4Option">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="platform"
                          id="mt4Option"
                          value="MT4"
                          onChange={(e) => {
                            setFieldValue(accountTypeKey, "");
                            handleChange(e);
                          }}
                        />
                        <span className="form-check-label ms-3">
                          {t("new_account.form.metatader")} 4
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      {t("new_account.form.account_type")}
                    </label>
                    <div className="row g-3">
                      {typesLoading && (
                        <div className="col-12">
                          {t("new_account.form.loading")}...
                        </div>
                      )}
                      {accountTypes
                        .filter((a) => a.platform == values.platform)
                        .map((acc) => (
                          <div className="col-6" key={acc._id}>
                            <label
                              className={classNames(
                                "form-check-inline border px-3 py-3 w-100"
                              )}
                              htmlFor={acc.name}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name={accountTypeKey}
                                id={acc.name}
                                value={acc._id}
                                onChange={(e) => {
                                  console.log(acc)
                                  setSelected(acc)
                                  handleChange(e)
                                }}
                              />
                              <span className="form-check-label ms-3">
                                {acc.name}
                              </span>
                            </label>
                          </div>
                        ))}
                    </div>
                    {errors[accountTypeKey] && (
                      <small className="text-danger small error-message">
                        {errors[accountTypeKey]}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="disabledSelect" className="form-label">
                      {t("new_account.form.currency")}
                    </label>
                    <div className="border d-flex justify-content-between align-items-center py-2 px-3">
                      <div className="d-flex align-items-center">
                        <img src={UsFlag} alt="" width={30} />
                        <div className="ms-3 small text-dark">
                          USD
                          <small className="d-block text-muted">
                            {t("new_account.form.us_dollar")}
                          </small>
                        </div>
                      </div>
                      <img src={CheckIcon} alt="" height={16} />
                    </div>
                  </div>

                  {isMaxinmumReached() && (
                    <div className="mb-3">
                      <label htmlFor="disabledSelect" className="form-label">
                        {t("new_account.form.reason_text")}
                      </label>
                      <FormGroup
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="reason"
                        errors={errors}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  {isDemoAccount && (
                    <div className="mb-3">
                      <label htmlFor="disabledSelect" className="form-label">
                        {t("new_account.form.balance")}
                      </label>
                      <FormGroup
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="balance"
                        errors={errors}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="disabledSelect" className="form-label">
                      {t("new_account.form.account_password")}
                    </label>
                    <FormGroup
                      type="password"
                      className="form-control"
                      id="exampleFormControlInput1"
                      name="portalPassword"
                      errors={errors}
                      onChange={handleChange}
                      autoComplete="off"
                      customError={errorMessage}
                    />
                    <div>
                      <span className="badge text-bg-light">
                        {t("new_account.form.uppercase")}
                      </span>
                      <span className="badge text-bg-light mx-1">
                        {t("new_account.form.lowercase")}
                      </span>
                      <span className="badge text-bg-light">
                        {t("new_account.form.numbers")}
                      </span>
                    </div>
                  </div>
                  <AppButton
                    loading={loading}
                    className="btn btn-primary w-100 py-3"
                    type="submit"
                    onClick={handleSubmit}>
                    {isMaxinmumReached()
                      ? t("new_account.form.request_cta")
                      : t("new_account.form.submit_cta")}
                  </AppButton>
                </div>
              </div>
            )}
          </Formik>
        </section>
      </div>
      <div className="col-lg-6 col-sm-12 ">
        <section className="section">
          <div className="card custom-shadow py-5">
            <div className="col-12 col-xl-5 mx-auto" style={{ minWidth: "100%", minHeight: "570px" }}>
              <div>
                <h3 className="d-flex justify-content-center text-center heading">{selected.name}</h3>
              </div>

              {
                AccountTypeDetails.map((value, index) => {
                  return <div className="row row-d" style={{margin:"10px"}}>
                    <div className="col-lg-6">
                      <span style={{
                        fontWeight:"bold"
                      }}>{value.name}:</span>
                    </div>
                    <div className="col-lg-6">
                      <span xs={6} className={`d-flex justify-content-center text-center `} >{t(`${value[selected.name || '']}`)}</span>
                    </div>

                    {/* <td>{formik.values}</td> */}

                  </div>
                  // <div class="container">






                  {/* </div> */ }
                  // return <div>
                  //   {value.name}
                  // </div>
                })
              }

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewAccount;
