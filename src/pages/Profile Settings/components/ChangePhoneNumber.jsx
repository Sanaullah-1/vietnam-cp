import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppButton from "../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import tradingAccountsService from "../../../services/tradingAccounts.service";
const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
function ChangePhoneNumber({ show, onClose }) {
  const [loading, setloading] = useState(false);
  const onSubmitHandler = async (values) => {
    setloading(true);

    try {
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h6 fw-bold">Change Phone Number</Modal.Title>
        </Modal.Header>

        <Formik
          validationSchema={changePasswordSchema}
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);

            console.log(values);
          }}
        >
          {({ handleChange, errors, handleSubmit }) => (
            <>
              <Modal.Body>
                <Form>
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                          +971
                        </span>
                        <input
                          className="form-control"
                          //   type="password"
                          //   label="New Mobile Number"
                          //   onChange={handleChange}
                          //   errors={errors}
                          //   name="password"
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <AppButton
                  className="btn btn-primary"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Change
                </AppButton>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ChangePhoneNumber;
