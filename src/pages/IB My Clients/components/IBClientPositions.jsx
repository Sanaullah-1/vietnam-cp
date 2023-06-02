import classNames from "classnames";
import { startCase } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import ibService from "../../../services/ib.service";
import { useTranslation } from "react-i18next";

const IBClientPositions = ({ selectedClientApplication }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("open");
  const [data, setData] = useState([]);
  const classes = (t) => {
    if (t == type) return "btn-primary";
    return "bg-white border";
  };

  useEffect(() => {
    console.log("again");
    (async function () {
      setLoading(true);
      try {
        const { result } = await ibService.getClientTrades(
          selectedClientApplication,
          type
        );
        setData(result.positions);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [type]);

  const handleChangeAccountType = (t) => {
    if (t != type) {
      setData([]);
      setType(t);
    }
  };
  return (
    <>
      <section className="section">
        <div className="d-flex align-items-start align-items-md-end justify-content-between flex-column flex-md-row">
          <h5 className="heading text-capitalize">  {t('ib_portal.client_activity.trading_activity.title')}</h5>
          <div className="d-flex">
            <button
              className={classNames("btn  border mb-3 me-2", classes("open"))}
              onClick={() => handleChangeAccountType("open")}
            >
              {t('ib_portal.client_activity.trading_activity.live_trades')}
            </button>

            <button
              className={classNames("btn  border mb-3", classes("close"))}
              onClick={() => handleChangeAccountType("close")}
            >
              {t('ib_portal.client_activity.trading_activity.close_trades')}
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-borderless custom-shadow">
            <thead>
              <tr>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.symbol')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.ticket')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.time')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.deal_type')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.volume')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.price')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.sl')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.tp')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.price_position')}</th>
                <th scope="col">{t('ib_portal.client_activity.trading_activity.table.headings.profit')}</th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableLoadingRow colSpan={10} />}
              {!loading && data.length == 0 && (
                <tr>
                  <td colSpan={10} className="text-md-center">
                    {t('ib_portal.client_activity.trading_activity.table.body.empty')}
                  </td>
                </tr>
              )}
              {!loading &&
                data.map((position) => (
                  <tr>
                    <td>{position.symbol}</td>
                    <td>{position.ticket}</td>
                    <td>
                      {moment(position.createdAt).format("MMMM Do YYYY, h:mm")}
                    </td>
                    <td>buy</td>
                    <td>{position.volume}</td>
                    <td>{position.price}</td>
                    <td>{position.priceSl}</td>
                    <td>{position.priceTp}</td>
                    <td>{position.pricePosition}</td>
                    <td>{position.profit}</td>
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

export default IBClientPositions;
