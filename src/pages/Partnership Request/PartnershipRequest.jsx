import { Formik } from "formik";
import React, { useState } from "react";
import ReactSelect from "react-select";
import { COUNTRIES } from "../../components/CompleteProfileForm/countries";
import FormGroup from "../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../components/shared/SelectGroup/SelectGroup";
import TitleWithBackButton from "../../components/shared/TitleWithBackButton/TitleWithBackButton";
import * as Yup from "yup";
import commonService from "../../services/common.service";
import AppButton from "../../components/shared/AppButton/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../services/user.service";
import { userLoaded } from "../../redux/slices/userSlice";
import { fetchAndUpdateUserProfile } from "../../utils/userUtils";
import { useTranslation } from "react-i18next";
const partnershipSchema = Yup.object().shape({
  haveSite: Yup.string().required(),
  refOther: Yup.string().required(),
  targetCountries: Yup.array().min(1).required(),
  getClient: Yup.string().required(),
  expected: Yup.number().required(),
});
const PartnershipRequest = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitHandler = async (values) => {
    setloading(true);
    try {
      const { isSuccess } = await commonService.requestPartnership(values);
      if (isSuccess) {
        await fetchAndUpdateUserProfile();
        toast.success("Partnership has been requested!");
        navigate("/partnership");
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  if (currentUser?.isIb) {
    return (
      <div className="alert alert-info my-3" role="alert">
        Your partnership requrest has already been sent.{" "}
        <Link to="/partnership">Back to partnership</Link>
      </div>
    );
  }
  return (
    <>
      <section className="section">
        <TitleWithBackButton
          title={t("partnership.request.title")}
          path="/partnership"
          name={t("partnership.request.go_back")}
        />
        <div className="card custom-shadow px-3 p-lg-5 py-4">
          <Formik
            validationSchema={partnershipSchema}
            initialValues={{
              haveSite: "",
              refOther: "",
              targetCountries: [],
              getClient: "",
              expected: "",
            }}
            onSubmit={(values) => onSubmitHandler(values)}>
            {({ handleChange, handleSubmit, errors, setFieldValue }) => (
              <div className="mx-auto w-100" style={{ maxWidth: 500 }}>
                <div>
                  <SelectGroup
                    label={t("partnership.request.form.labels.financial")}
                    options={[
                      { name: "Yes", value: "yes" },
                      { name: "No", value: "no" },
                    ]}
                    name="haveSite"
                    onChange={handleChange}
                    errors={errors}
                  />
                  <SelectGroup
                    label={t("partnership.request.form.labels.reffered")}
                    options={[
                      { name: "Yes", value: "yes" },
                      { name: "No", value: "no" },
                    ]}
                    name="refOther"
                    onChange={handleChange}
                    errors={errors}
                  />
                  <SelectGroup
                    label={t("partnership.request.form.labels.acquire")}
                    options={[
                      {
                        name: "Wide range of personal network",
                        value: "Wide range of personal network",
                      },
                      {
                        name: "Developing trading strategies and signals",
                        value: "Developing trading strategies and signals",
                      },
                      {
                        name: "Providing Forex education seminars",
                        value: "Providing Forex education seminars",
                      },
                      { name: "Other", value: "Other" },
                    ]}
                    name="getClient"
                    onChange={handleChange}
                    errors={errors}
                  />

                  <div className="mb-3">
                    <label className="form-label">
                      {t("partnership.request.form.labels.countries")}
                    </label>

                    <ReactSelect
                      placeholder=""
                      name="targetCountries"
                      isMulti
                      options={COUNTRIES}
                      onChange={(e) =>
                        setFieldValue(
                          "targetCountries",
                          e.map((i) => i.countryEn)
                        )
                      }
                      getOptionValue={(op) => op.countryEn}
                      getOptionLabel={(op) => op.countryEn}
                      theme={(t) => ({
                        ...t,
                        borderRadius: 0,
                        borderColor: "red",
                      })}
                    />
                    {errors.targetCountries && (
                      <small className="text-danger small error-message">
                        {errors.targetCountries}
                      </small>
                    )}
                  </div>
                  <FormGroup
                    label={t(
                      "partnership.request.form.labels.expected_clients"
                    )}
                    type="number"
                    inputMode="numeric"
                    name="expected"
                    onChange={handleChange}
                    errors={errors}
                  />

                  <AppButton
                    loading={loading}
                    className="btn btn-primary w-100 mt-2 py-2"
                    onClick={handleSubmit}>
                    {t("partnership.request.form.cta")}
                  </AppButton>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default PartnershipRequest;
