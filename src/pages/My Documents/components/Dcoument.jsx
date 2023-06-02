import React from "react";
import { Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getStatusClass, getStatusTitle } from "../../../utils/myDocuments";
import { useTranslation } from "react-i18next";

const Document = ({ data, title, loading }) => {
  const { t } = useTranslation()

  const { name, status, path, isEmpty } = data;
  const head = () => <h5 className="hearder-docs w-300"></h5>;
  return (
    <section className="section">
      <div className="card p-3 mb-4 px-4 custom-shadow">
        <div className="d-flex align-items-center">
          <div className="">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <h5 className="fw-bold mb-2">{t(title)}</h5>
            )}
            <br />
            <p>{name}</p>
            {loading ? (
              <Skeleton width={200} />
            ) : (
              <div>
                {isEmpty ? (
                  <Link
                    to="/my-documents/new"
                    className="btn btn-link fw-semibold fs-6 px-0"
                  >
                    <Button>Upload</Button>
                  </Link>
                ) : (
                  <span
                    className={`${getStatusClass(
                      status
                    )} badge text-capitalize fw-bold rounded-1`}
                  >
                    {getStatusTitle(status)}
                  </span>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="ms-auto">
              {" "}
              <div className="avatar">
                <Skeleton
                  circle
                  height="100%"
                  containerClassName="avatar-skeleton"
                />
              </div>
            </div>
          ) : (
            <div className="ms-auto">
              <img src={data.image} alt="" height={100} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Document;
