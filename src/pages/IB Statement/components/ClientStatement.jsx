import classNames from "classnames";
import { startCase } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import ibService from "../../../services/ib.service";
import { Trans, useTranslation } from "react-i18next";

const IBClientStatement = ({ selectedClient, query }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("commission");
  const [data, setData] = useState({});
  const classes = (t) => {
    if (t == type) return "btn-primary";
    return "bg-white border";
  };

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { result } = await ibService.getClientStatement(
          selectedClient._id,
          query
        );
        setData(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [type]);

  const handleTradesTypeChange = (t) => {
    if (t != type) {
      setData([]);
      setType(t);
    }
  };
  return (
    <>
      <section className="section">
        <div className="d-flex align-items-start align-items-md-end justify-content-between flex-column flex-md-row">
          <h5 className="heading">{t('ib_portal.client_statement.title', { firstName: selectedClient.firstName })}</h5>
          <div className="d-flex">
            <button
              className={classNames(
                "btn  border mb-3 me-2",
                classes("commission")
              )}
              onClick={() => handleTradesTypeChange("commission")}
            >
              {t('ib_portal.client_statement.commission')}
            </button>

            <button
              className={classNames("btn  border mb-3", classes("rebate"))}
              onClick={() => handleTradesTypeChange("rebate")}
            >
              {t('ib_portal.client_statement.rebate')}
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-borderless custom-shadow">
            <thead>
              <tr>
                <th scope="col">{t('ib_portal.client_statement.table.headings.symbol')}</th>
                <th scope="col">{t('ib_portal.client_statement.table.headings.account')}</th>
                <th scope="col">{t('ib_portal.client_statement.table.headings.position_id')}</th>
                <th scope="col">{t('ib_portal.client_statement.table.headings.deal_id')}</th>
                <th scope="col">{t('ib_portal.client_statement.table.headings.volume')}</th>
                <th scope="col">
                  <Trans i18nKey="ib_portal.client_statement.table.headings.type" values={{ type: startCase(type) }}>
                    {{ type }}
                  </Trans>
                </th>

              </tr>
            </thead>
            <tbody>
              {loading && <TableLoadingRow colSpan={6} />}
              {!loading && data[type]?.docs.length == 0 && (
                <tr>
                  <td colSpan={10} className="text-md-center">
                    {t('ib_portal.client_statement.table.body.empty')}
                  </td>
                </tr>
              )}
              {!loading &&
                data[type]?.docs.map((position) => (
                  <tr>
                    <td>{position.symbol}</td>
                    <td>{position.mt5Account}</td>

                    <td>{position.positionId}</td>
                    <td>{position.dealId}</td>
                    <td>{position.volume}</td>
                    <td>{position[type]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="empty-space"></div>
    </>
  );
};

export default IBClientStatement;
