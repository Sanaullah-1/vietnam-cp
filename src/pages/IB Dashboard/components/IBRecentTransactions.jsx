import classNames from "classnames";
import { startCase } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import ibService from "../../../services/ib.service";
import { Trans, useTranslation } from "react-i18next";

const IBRecentTransactions = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("deposit");
  const [transactions, setTransactions] = useState([]);
  const classes = (t) => {
    if (t == type) return "btn-primary";
    return "bg-white border";
  };
  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { result } = await ibService.getRecentTransaction(type);
        setTransactions(result.docs);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [type]);
  const handleSelectAccount = async () => {
    try {
      setLoading(true);
      // const data = await tradingAccountsService.getAccountDetails(account._id);
      // setaccountDetails(data);
    } catch (error) { }
    setLoading(false);
  };
  const handleChangeAccountType = (t) => {
    if (t != type) {
      setTransactions([]);
      setType(t);
    }
  };
  return (
    <>
      <section className="section">
        <div className="d-flex align-items-start align-items-md-end justify-content-between flex-column flex-md-row">

          <h5 className="heading text-capitalize">
            {t('ib_portal.recent_transactions.title', { context: type })}
          </h5>

          <div className="d-flex">
            <button
              className={classNames(
                "btn  border mb-3 me-2",
                classes("withdrawal")
              )}
              onClick={() => handleChangeAccountType("withdrawal")}
            >
              {t('ib_portal.recent_transactions.withdrawal')}
            </button>

            <button
              className={classNames(
                "btn  border mb-3 me-2",
                classes("deposit")
              )}
              onClick={() => handleChangeAccountType("deposit")}
            >
              {t('ib_portal.recent_transactions.deposits')}

            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-borderless custom-shadow">
            <thead>
              <tr>
                <th scope="col">              {t('ib_portal.recent_transactions.table.heading.account')}
                </th>
                <th scope="col">{t('ib_portal.recent_transactions.table.heading.transaction_id')}</th>
                <th scope="col">{t('ib_portal.recent_transactions.table.heading.mode')}</th>
                <th scope="col">{t('ib_portal.recent_transactions.table.heading.amount')}</th>
                <th scope="col">{t('ib_portal.recent_transactions.table.heading.status')}</th>
                <th scope="col" className="text-end">
                  {t('ib_portal.recent_transactions.table.heading.date')}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableLoadingRow colSpan={6} />}
              {!loading && !transactions?.length && (
                <tr>
                  <td colSpan={10} className="text-md-center">
                    {t('ib_portal.recent_transactions.table.body.empty')}
                  </td>

                </tr>
              )}
              {transactions.map((t) => (
                <tr>
                  <td>{t.transactionParties.account}</td>
                  <td>{t.recordId}</td>
                  <td>{t.transactionParties.gateway ?? ""}</td>
                  <td>{t.amount}</td>
                  <td>{t.status}</td>
                  <td align="end">
                    {moment(t.createdAt).format("MMMM Do YYYY, h:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default IBRecentTransactions;
