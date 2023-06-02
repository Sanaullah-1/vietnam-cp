import { Form, Formik } from "formik";
import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { Helmet } from "react-helmet";

function PaymentIframeModal({ show, onClose, iframeUrl, scriptUrl, iframeName }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Modal show={show} onHide={onClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="h6 fw-bold">DEPOSIT {iframeName ? iframeName : 'Page'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loaded && (
            <div className="text-center pt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {scriptUrl && (
            <Helmet>
              <script
                type="text/javascript"
                async={false}
                src={scriptUrl}
                onLoad={() => setLoaded(true)}
              ></script>
            </Helmet>
          )}
          {iframeUrl && (
            <iframe
              src={iframeUrl}
              className="w-100"
              style={{ minHeight: "80vh" }}
              onLoad={() => {
                console.log("loaded");
                setLoaded(true);
              }}
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaymentIframeModal;
