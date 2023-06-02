import React, { useEffect, useState } from "react";
import Document from "./Dcoument";
import { fetchSumsubDocuments, getDocuments } from "../../../services/myDocuments.service";
import { useSelector } from "react-redux";
import { reshapDocs } from "../../../utils/myDocuments";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import './skeleton.scss'
const DocumentList = () => {

    const user = useSelector((state) => state.user)
    const [docs, setDocs] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        (async function () {
            setloading(true);
            try {
                const { result } = await getDocuments();
                const data = await fetchSumsubDocuments(user._id)
                let { mergedData, isEmpty } = await reshapDocs(data.sumSubDocs ? data.sumSubDocs : {}, result)
                setDocs(mergedData);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
            }

        })();
        // let docs = await getDocuments()
    }, [])

    return (
        loading ? <Document data={{ name: "", status: "" }} title={""} loading={loading} /> : <section section className="section" >
            {
                Object.keys(docs).map(rec => {
                    return docs[rec].map(file => {
                        return <Document data={file} title={rec} loading={loading} />
                    })
                })

            }
        </section >

    );
};

export default DocumentList;
