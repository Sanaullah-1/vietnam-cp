import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import AppButton from "../../../components/shared/AppButton/AppButton";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
// import { CurrencyOptions } from "./../currencies";
import * as Yup from "yup";
import TitleWithBackButton from "../../../components/shared/TitleWithBackButton/TitleWithBackButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import UploadImage from "./UploadImage";
import Thumb from "./Thumb";
import { fetchSumsubDocuments, getDocuments, uploadDocument } from "../../../services/myDocuments.service";
import { toast } from "react-toastify";
import { isProofOfAddressApproved, reshapDocs } from "../../../utils/myDocuments";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const fileSchema = Yup.object().shape({
  file: Yup.mixed().required('File is required'),
});

const UploadDocumentsForm = (props) => {
  const [loading, setloading] = useState(false);
  const { t } = useTranslation()

  const [documentType, setDocumentType] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { docTypes } = props
  const params = useParams();
  const [documentDetails, setDocumentDetails] = useState({
    documentNo: '',
    countryOfIssue: '',
    dateOfIssue: '',
    dateOfExpiry: ''
  });
  const currentUser = useSelector((state) => state.user);
  const [docs, setDocs] = useState([]);
  const [isProofOfAddress, setIsProofOfAddress] = useState(false);


  useEffect(() => {
    (async function () {
      setloading(true);
      try {

        const { result: documents } = await getDocuments();
        const data = await fetchSumsubDocuments(currentUser._id)
        let { mergedData, isEmpty } = await reshapDocs(data.sumSubDocs, documents)
        if(isProofOfAddressApproved(mergedData)){
          setDocumentType("ADDITIONAL_DOCUMENTS")
        }else{
          setDocumentType("ADDRESS_PROOF")
        }


      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, [])
  const onSubmitHnalder = async (values) => {
    setloading(true);
    try {
      const document = {
        title: documentType,
        files: [values.file],
        documentDetails
      };
      let { result } = await uploadDocument(document)
      setloading(false);
      toast.success("Uploaded Successfully");
      navigate("/my-documents")
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  return (
    <div>
      <div className="position-relative">
        <div className="position-absolute end-0 bottom-0">
     {    (documentType || documentType=="") && <SelectGroup
            // label="Select Doc Type"
            options={docTypes ?? []}
            name="Select Doc Type"
            placeholder={"Select Document"}
            defaultValue={documentType}
            onChange={(e) => {
              setDocumentType(e.target.value)
            }}
            
          /> }

        </div>
      </div>
      <div className="card p-4">
        <Formik
          validationSchema={fileSchema}
          enableReinitialize
          validateOnChange={false}
          initialValues={{ file: null }}
          onSubmit={(values) => onSubmitHnalder(values)}
        >
          {({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
            <Form>

              <h5 className="gy-2">
                {t('my_documents.upload')}
              </h5>
              <div className="row col-12 gy-2" >
                <div className="col-4">
                  <UploadImage
                    label="Passport"
                    name="file"
                    onChange={(event) => {
                      const files = event.target.files;
                      let myFiles = Array.from(files);
                      setFieldValue("file", myFiles[0]);
                    }}
                    errors={errors}
                    type="file"
                  />
                </div>
                <div className="col-1">
                  <Thumb file={values.file} />
                </div>

                <div className="w-100"></div>
                <div className="col-4">
                  <AppButton
                    loading={loading}
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                  >
                    {t('my_documents.save')}
                  </AppButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UploadDocumentsForm;
