import React, { useEffect, useState } from "react";
import AccupayCard from "../../../assets/images/accupay-card.png";
import AppButton from "../../../components/shared/AppButton/AppButton";
import { useTranslation } from "react-i18next";
import commonService from "../../../services/common.service";
import { Button, Carousel, Modal } from "react-bootstrap";
import { isRegExp } from "lodash";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
const Campaigns = (props) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [selectedAccount, setselectedAccount] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null)
  const { show, onClose, isRequested, liveAccounts,setIsRequested } = props

  //   useEffect(() => {
  //     const account = searchParams.get("account");
  //     if (account) {
  //         setselectedAccount(account);
  //     }
  // }, []);
  const onSubmitHandler = async (values, resetForm) => {
    setloading(true);
    try {
   
      const res = await commonService.submitCampaign({
        title: "Vietnam Bonus", data: {
          confirmation: 'Yes',
          accountNumber: values.accountNumber,
          applicationId: liveAccounts.find(
            (acc) => acc.mt5Account == values.accountNumber
          )._id,

        },
        campaignId: "6479e989ae400255100c09bd"
      });

      if (res.isSuccess) {
        // setisSuccess(true);
        toast.success("Bonus Requested Successfully");
        setIsRequested(true)
        setloading(false)
        resetForm()
        onClose()

      }else{
        // setErrorMessage(res.errors)
        toast.error(res.errors);
        onClose()
      }
    } catch (error) {
      console.log(error.response);
      setloading(false)
    }
    setloading(false);
  };
  console.log(props)
  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header >

          <Modal.Body>
            {isRequested ?
              <h2>Bonus Already requested</h2>
              : <div>
                <div>
                  <Formik
                    validateOnChange={false}
                    enableReinitialize
                    // validationSchema={skrillSchema}
                    initialValues={{
                      accountNumber: selectedAccount || "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                      onSubmitHandler(values, resetForm);
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
                                value={values.accountNumber}
                              />
                            </div>

                          </div>
                          <AppButton
                            loading={loading}
                            className="btn btn-primary w-100 mt-4"
                          // onClick={handleSubmit}
                          >
                            Request Bonus
                          </AppButton>
                        </Form>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
            }
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default Campaigns;
