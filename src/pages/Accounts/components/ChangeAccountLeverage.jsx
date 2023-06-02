import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppButton from "../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
import tradingAccountsService from "../../../services/tradingAccounts.service";
import { useTranslation } from "react-i18next";
const changeLeverageSchema = Yup.object().shape({
  leverage: Yup.string().required(),
});
function ChangeAccountLeverage({ show, onClose, selectedAccount }) {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const onSubmitHandler = async (values) => {
    setloading(true);
    const data = {
      leverage: values.leverage,
      currentLeverage: selectedAccount.leverage.toString(),
      accountNo: selectedAccount.mt5Account.toString(),
      accountId: selectedAccount._id,
    };

    try {
      const isChanged = await tradingAccountsService.changeAccountLeverage(
        data
      );
      if (isChanged) {
        toast.success("Change leverage requested!");
      }
      onClose();
    } catch (error) {
      toast.error(error.toString());
    }
    setloading(false);
  };
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h6 fw-bold">
            {t("change_leverage.title")} ({selectedAccount?.mt5Account})
          </Modal.Title>
        </Modal.Header>

        <Formik
          validationSchema={changeLeverageSchema}
          initialValues={{
            leverage: `1:${selectedAccount?.leverage}`,
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}>
          {({ handleChange, errors, handleSubmit, values }) => (
            <>
              <Modal.Body>
                <Form>
                  <div className="row">
                    <div className="col-12">
                      <SelectGroup
                        label={t("change_leverage.form.leverage")}
                        onChange={handleChange}
                        errors={errors}
                        name="leverage"
                        options={leverages}
                        defaultValue={values.leverage}
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <AppButton
                  className="btn btn-primary"
                  loading={loading}
                  onClick={handleSubmit}>
                  {t("change_leverage.form.cta")}
                </AppButton>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
}
const leverages = [
  { name: "1:100", value: "1:100" },
  { name: "1:200", value: "1:200" },
  { name: "1:300", value: "1:300" },
  { name: "1:400", value: "1:400" },
  // { name: "1:500", value: "1:500" },
];
export default ChangeAccountLeverage;
