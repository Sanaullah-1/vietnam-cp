import React, { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import FormGroup from "../shared/FormGroup/FormGroup";
import SelectGroup from "../shared/SelectGroup/SelectGroup";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import * as Yup from "yup";
import {
  COUNTRIES,
  getSortedCountries,
  languages,
  titles,
  sourceOfFunds,
  industries,
  employmentStatus,
  annualIncome,
  declarations,
} from "./dropdownValues";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../services/user.service";
import AppButton from "../shared/AppButton/AppButton";
import { userLoaded } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";

const schema = Yup.object().shape({
  title: Yup.string().required(),
  dob: Yup.date().required(),
  address: Yup.string().required(),
  addressLine2: Yup.string(),
  city: Yup.string().required(),
  zipCode: Yup.string(),
  industry: Yup.string().required(),
  employmentStatus: Yup.string().required(),
  jobTitle: Yup.string(),
  nameOfEmployer: Yup.string(),
  sourceOfFunds: Yup.string().required(),
  politicallyExposed: Yup.string().required(),
  fatca: Yup.string().required(),
  annualIncome: Yup.string().required(),
  nationality: Yup.string().required(),
  declarations: Yup.array().min(4, "Please mark checked").required(),
  language: Yup.string().required(),
  usaCitizen: Yup.string().required(),
  workedInFinancialServices: Yup.string().required(),
  taxIdentificationNumber: Yup.string().when("usaCitizen", {
    is: (val) => val == "yes", // alternatively: (val) => val == true
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
});

const CompleteProfileForm = () => {
  const { t } = useTranslation()
  const currentUser = useSelector((state) => state.user);
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.journeys[0].status == false) setshow(true);
  }, []);
  const handleClose = () => setshow(false);

  const handleOnSubmit = async (values) => {
    setloading(true);

    const userData = {
      ...values,
    };
    userData.employmentDetails = {
      industry: values.industry,
      employmentStatus: values.employmentStatus,
      jobTitle: values.jobTitle,
      nameOfEmployer: values.nameOfEmployer,
    };
    delete userData.industry;
    delete userData.employmentStatus;
    delete userData.jobTitle;
    delete userData.nameOfEmployer;
    delete userData.usaCitizen;
    try {
      const { result: updatedUser } = await userService.completeUserProfile(
        userData
      );
      const { result: updatedJourney } =
        await userService.getCurrentUserJourney();
      updatedUser.journeys = updatedJourney.journeys;
      dispatch(userLoaded(updatedUser));
      setshow(false);
      toast.success("Profile Completed!");
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Formik
          validationSchema={schema}
          validateOnChange={false}
          initialValues={{
            title: "",
            dob: "",
            address: "",
            addressLine2: "",
            city: "",
            zipCode: "",
            industry: "",
            employmentStatus: "",
            jobTitle: "",
            nameOfEmployer: "",
            sourceOfFunds: "",
            politicallyExposed: "",
            fatca: "",
            annualIncome: "",
            gender: "male",
            nationality: "",
            declarations: [],
            language: "",
            workedInFinancialServices: "",
            taxIdentificationNumber: "",
            usaCitizen: "",
          }}
          onSubmit={(values) => handleOnSubmit(values)}>
          {({ handleChange, errors, handleSubmit, values, setFieldValue }) => (
            <>
              <Modal.Header closeButton className="px-3 px-lg-4 py-4">
                <div>
                  <Modal.Title className="text-primary fw-bold">
                    {t('complete_profile.title')}
                  </Modal.Title>
                  <p className="mb-0">{t('complete_profile.sub_title')}</p>
                </div>
              </Modal.Header>
              <Modal.Body className="px-3 px-lg-5 py-4">
                <Form>
                  <div className="row g-3">
                    <div className="col-12 col-lg-2">
                      <SelectGroup
                        label={t('complete_profile.form.labels.title')}
                        options={titles}
                        name="title"
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-5">
                      <FormGroup
                        label={t('complete_profile.form.labels.dob')}
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-5">
                      <label className="form-label">{t('complete_profile.form.labels.nationality')}</label>

                      <Select
                        placeholder=""
                        name="nationality"
                        options={COUNTRIES}

                        onChange={(e) =>
                          setFieldValue("nationality", e.countryEn)
                        }
                        getOptionValue={(op) => op.countryEn}
                        getOptionLabel={(op) => op[i18n.language == 'ar' ? 'countryAr' : 'countryEn']}
                        theme={(t) => ({
                          ...t,
                          borderRadius: 0,
                          borderColor: "red",
                        })}
                      />
                      {errors.nationality && (
                        <small className="text-danger small error-message">
                          {errors.nationality}
                        </small>
                      )}
                    </div>
                    <div className="col-12">
                      <FormGroup
                        label={t('complete_profile.form.labels.addr_1')}
                        name="address"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <FormGroup
                        label={t('complete_profile.form.labels.addr_2')}
                        name="addressLine2"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <SelectGroup
                        label={t('complete_profile.form.labels.lang')}
                        options={languages}
                        titleText={'name'}

                        name="language"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <FormGroup
                        label={t('complete_profile.form.labels.city')}
                        name="city"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <FormGroup
                        label={t('complete_profile.form.labels.postal')}
                        name="zipCode"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <SelectGroup
                        label={t('complete_profile.form.labels.profession')}
                        options={industries}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}
                        name="industry"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <SelectGroup
                        label={t('complete_profile.form.labels.employment')}
                        options={employmentStatus}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        name="employmentStatus"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    {values.employmentStatus == "Employed (full time)" && (
                      <>
                        <div className="col-12 col-lg-6">
                          <FormGroup
                            label={t('complete_profile.form.labels.job')}
                            name="jobTitle"
                            onChange={handleChange}
                            errors={errors}
                          />
                        </div>
                        <div className="col-12 col-lg-6">
                          <FormGroup
                            label={t('complete_profile.form.labels.employer')}
                            name="nameOfEmployer"
                            onChange={handleChange}
                            errors={errors}
                          />
                        </div>
                      </>
                    )}
                    <div className="col-12 col-lg-6">
                      <SelectGroup
                        label={t('complete_profile.form.labels.income')}
                        options={annualIncome}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        name="annualIncome"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <SelectGroup
                        label={t('complete_profile.form.labels.funds_source')}
                        options={sourceOfFunds}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        name="sourceOfFunds"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12">
                      <SelectGroup
                        label={t('complete_profile.form.labels.politically_member')}
                        options={[
                          { name: "Yes", value: "yes", ar: "نعم" },
                          { name: "No", value: "no", ar: "لا" },
                        ]}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        name="politicallyExposed"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12">
                      <h4>{t('complete_profile.form.labels.fatca')}</h4>
                      <p className="text-dark small mt-2">
                        {t('complete_profile.form.labels.fatca_decription')}
                      </p>
                    </div>
                    <div className="col-12">
                      <SelectGroup
                        label={t('complete_profile.form.labels.politically_member')}
                        options={[
                          { name: "Yes", value: "yes", ar: "نعم" },
                          { name: "No", value: "no", ar: "لا" },
                        ]}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        name="fatca"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12">
                      <SelectGroup
                        label={t('complete_profile.form.labels.usa_citizen')}
                        options={[
                          { name: "Yes", value: "yes", ar: "نعم" },
                          { name: "No", value: "no", ar: "لا" },
                        ]}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        name="usaCitizen"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    {values.usaCitizen == "yes" && (
                      <div className="col-12">
                        <FormGroup
                          label={t('complete_profile.form.labels.tax')}
                          name="taxIdentificationNumber"
                          onChange={handleChange}
                          errors={errors}
                        />
                      </div>
                    )}
                    <div className="col-12">
                      <SelectGroup
                        label={t('complete_profile.form.labels.work_relevant')}
                        options={[
                          { name: "Yes", value: "yes", ar: "نعم" },
                          { name: "No", value: "no", ar: "لا" },
                        ]}
                        titleText={i18n.language == 'ar' ? 'ar' : 'name'}

                        name="workedInFinancialServices"
                        onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div className="col-12">
                      <h6 className="fw-bold mb-3">
                        {t('complete_profile.form.declarations.title')}
                      </h6>
                      {t('complete_profile.form.declarations.list', { returnObjects: true }).map((d) => (
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={d}
                            id={d}
                            name="declarations"
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label small "
                            htmlFor={d}
                            dangerouslySetInnerHTML={{
                              __html: d,
                            }}
                          />
                        </div>
                      ))}

                      {errors.declarations && (
                        <small className="text-danger">
                          {errors.declarations}
                        </small>
                      )}
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <AppButton
                  loading={loading}
                  onClick={handleSubmit}
                  className="btn btn-primary">
                  {t('complete_profile.form.cta')}
                </AppButton>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CompleteProfileForm;
