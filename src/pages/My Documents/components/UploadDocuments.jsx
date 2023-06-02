import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
import TitleWithBackButton from "../../../components/shared/TitleWithBackButton/TitleWithBackButton";
import { fetchSumsubDocuments, getDocuments, getKycDocumentsList } from "../../../services/myDocuments.service";
import { reshapDocs, showSumsub } from "../../../utils/myDocuments";
import SumsubIDUpload from "./SumsubIDUpload";
import UploadDocumentsForm from "./UploadDocumentsForm";
import { useTranslation } from "react-i18next";


const UploadDocuments = () => {
    const { t } = useTranslation()

    const currentUser = useSelector((state) => state.user);
    const [docs, setDocs] = useState([]);
    const [mergedDocs, setMergedDocs] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        (async function () {
            setloading(true);
            try {
                const { result } = await getKycDocumentsList("kycRequirements")
                let clientType = currentUser.clientType
                let kycReqArr = result.filter(v => v.clientTypes.includes(clientType) && !(['AGREEMENT', 'AGREEMENTS_INTERNAL', 'APPLICATIONS', 'IB_STRUCTURE', 'ID_PROOF'].includes(v.type))).map(rec => {
                    return {
                        name: rec.value,
                        value: rec.type
                    }
                })
                const { result: documents } = await getDocuments();
                const data = await fetchSumsubDocuments(currentUser._id)
                let { mergedData, isEmpty } = await reshapDocs(data.sumSubDocs, documents);
                setMergedDocs(mergedData);
                setDocs(kycReqArr)
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
            }

        })();
    }, [])
    return (
        loading ? <Skeleton
            height={100}
        /> : <section className="section">
            <TitleWithBackButton path="/my-documents" name={t('my_documents.heading')} />
            <div className="w-100"></div>
            {mergedDocs && showSumsub(mergedDocs) ? <SumsubIDUpload /> : <UploadDocumentsForm docTypes={docs} />}
        </section>
    );
};

export default UploadDocuments;
