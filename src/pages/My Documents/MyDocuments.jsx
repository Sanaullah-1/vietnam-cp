import React, { useCallback, useEffect, useState } from "react";
import DocumentList from "./components/DocumentsList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { reshapDocs } from "../../utils/myDocuments";
import { fetchSumsubDocuments, getDocuments } from "../../services/myDocuments.service";
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslation } from "react-i18next";
const MyDocuments = () => {
  const { t } = useTranslation()
  const currentUser = useSelector((state) => state.user);
  const [mergedDocs, setMergedDocs] = useState([]);
  const [loading, setloading] = useState(false);
  const [isEmpty, setIsEmpty] = useState();

  useEffect(() => {
    (async function () {
      setloading(true);
      try {
        const { result: documents } = await getDocuments();
        const data = await fetchSumsubDocuments(currentUser._id)
        let { mergedData, isEmpty } = await reshapDocs(data.sumSubDocs ? data.sumSubDocs : {}, documents)
        setMergedDocs(mergedData);
        setIsEmpty(isEmpty)
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, [])
  return (
    <section className="section">
      <h5 className="heading">{t('my_documents.title')}</h5>
      <DocumentList />
      {!isEmpty && <Link
        to="/my-documents/new"
        className="btn btn-link fw-semibold fs-6 px-0"
      >
        + {t('my_documents.cta')}
      </Link>
      }
    </section>
  );
};

export default MyDocuments;
