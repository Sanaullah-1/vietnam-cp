import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import AppButton from "../../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import paymentService from "../../../../services/payment.service";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";

const skrillSchema = Yup.object().shape({
    accountNumber: Yup.string().required(),
    amount: Yup.number().required().min(50),
});

const VertuPay = () => {
    const { t } = useTranslation();
    const vertuPayRef = useRef();
    const [loading, setloading] = useState(false);
    const [selectedAccount, setselectedAccount] = useState(null);
    const [banks, setBanks] = useState([])
    const [recData, setRecData] = React.useState({
        customer: '',
        reference: '',
        key: '',
        amount: '',
        createdAt: '',
        bank: '',
        clientIp: '',
        loading: false,
        currency: '',
    });
    const liveAccounts = useSelector(
        (state) => state.tradingAccounts.liveAccounts
    );
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const account = searchParams.get("account");
        if (account) {
            setselectedAccount(account);
        }
        (async function () {
            const response = await paymentService.vertuPayGetBanks()
            setBanks(response.result)
        })()
    }, []);
    useEffect(() => { }, [])
    const onSubmitHandler = async (values, resetForm) => {
        setloading(true);
        try {
            const response = await paymentService.vertuPayPay({
                accountNumber: values.accountNumber,
                applicationId: liveAccounts.find(
                    (acc) => acc.mt5Account == values.accountNumber
                )._id,
                amount: values.amount.toString(),
                bank: values.bank.toString(),
            });
            if (response.isSuccess) {
                setloading(false)
                resetForm()
                const newWin = window.open(response.result.Content.URL, "_blank");
                if(!newWin || newWin.closed || typeof newWin.closed=='undefined') {
                  window.location.href = response.result.data.link
                }
                setloading(false)

            }
        } catch (error) {
            console.log(error);
            setloading(false)
        }
    };
    return (
        <div>
            <Formik
                validateOnChange={false}
                enableReinitialize
                validationSchema={skrillSchema}
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
                                        label={t("deposit.forms.select_bank")}
                                        options={banks ?? []}
                                        valueText="code"
                                        titleText="name"
                                        name="bank"
                                        errors={errors}
                                        onChange={handleChange}
                                        value={values.bank}
                                    />
                                </div>
                            </div>
                            <AppButton
                                loading={loading}
                                className="btn btn-primary w-100 mt-4"
                            // onClick={handleSubmit}
                            >
                                {
                                    t('Make Payment')
                                }

                            </AppButton>
                        </Form>
                    </>
                )}
            </Formik>
         
        </div>
    );
};

export default VertuPay;
