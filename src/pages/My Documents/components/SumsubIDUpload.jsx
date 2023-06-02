import React, { useState, useEffect } from 'react';


import snsWebSdk from '@sumsub/websdk';
import { getSumsubToken } from '../../../services/myDocuments.service';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";


const SumsubIDUpload = (props) => {

  const { Documents, kycRequirements, documents, profile, user } = props;
  const { t } = useTranslation()

  const [docType, setDocType] = useState('');
  const [clientDetails, setClientDetails] = useState(null);
  const currentUser = useSelector((state) => state.user);

  
  useEffect(() => {
    (
        async function(){
            let result = await getSumsubToken();
            if (result) {
                launchWebSdk(
                 result.token,
                 currentUser.email,
                 currentUser.phone,
                  {}
                );
              }
        }
    )()
   
    
  }, [])


//   useEffect(() => {
//     if (!Documents.createDocumentLoading) {
//       resetHandler();
//     }
//     props.getDefaultJourney();
//   }, [Documents.createDocumentLoading]);






  const idApproved = () => {
    const idDocs = documents.filter((doc) => doc.title === 'ID_PROOF');
    if (
      clientDetails &&
      clientDetails.length > 0 &&
      clientDetails.length !== idDocs.length
    )
      return false;
    if (idDocs.length === 0) return false;
    return idDocs.every((doc) => doc.status === 'Approved');
  };


  const keyDocApproved = (person) => {

    return documents.find(
      (doc) =>
        doc.title === docType &&
        doc.status === 'Approved' &&
        doc.documentDetails &&
        doc.documentDetails.corpId ===
        (person.type === 'shareholder' || person.type === "directors" ? person._id : person.firstName)
    );
  }


  const launchWebSdk = (accessToken, applicantEmail, applicantPhone, customI18nMessages) => {
    let snsWebSdkInstance = snsWebSdk.init(
      accessToken,
      // token update callback, must return Promise
      // Access token expired
      // get a new one and pass it to the callback to re-initiate the WebSDK
      () => getNewAccessToken()
    )
      .withConf({
        lang: 'en', //language of WebSDK texts and comments (ISO 639-1 format)
        email: applicantEmail,
        phone: applicantPhone,
        i18n: customI18nMessages, //JSON of custom SDK Translations
        uiConf: {
          // customCss: "https://url.com/styles.css"
          // URL to css file in case you need change it dynamically from the code
          // the similar setting at Customizations tab will rewrite customCss
          // you may also use to pass string with plain styles `customCssStr:`
        },
      })
      .withOptions({ addViewportTag: false, adaptIframeHeight: true, })
      // see below what kind of messages WebSDK generates
      .on('idCheck.stepCompleted', (payload) => {
        console.log('stepCompleted', payload)
       
      }).
      onMessage((type, payload) => {
        if (type == "idCheck.applicantStatus") {
          if (payload && payload.reviewResult) {
            if (payload.reviewResult.reviewAnswer == "GREEN") {
              // history.push('/My-Documents')
            }

          }

        }
        console.log('onMessage', type, payload)
      })
      .on('idCheck.onError', (error) => {
        console.log('onError', error)
      })
      .build();

    // you are ready to go:
    // just launch the WebSDK by providing the container element for it
    snsWebSdkInstance.launch('#sumsub-websdk-container')
  }

  const getNewAccessToken = () => {
    return Promise.resolve('_act-sbx-575f611b-2568-43e0-bf37-a9334a7b29bd')// get a new token from your backend
  }



  return (
    <div className="card w-100 mb-5 upload-document-container">
      <div className="card-header font-weight-bold mb-0 text-dark h5">
        {t('my_documents.upload')}
      </div>
      <div className="card-body" style={{overflowY:"auto"}}>
        <div id="sumsub-websdk-container"></div>
      </div>
    </div>
  );
};



//connect with redux and give the access to defined method
export default SumsubIDUpload

