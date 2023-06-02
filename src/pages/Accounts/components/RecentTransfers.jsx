import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import _ from "lodash";
import tradingAccountsService from "../../../services/tradingAccounts.service";
import CustomPagination from "../../../components/shared/Pagination/Pagination";
import { useTranslation } from "react-i18next";
const RecentTransfers = ({ selectedAccountId }) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [pageInfo, setpageInfo] = useState({});
  const [query, setquery] = useState({
    limit: 5,
    page: 1,
  });

  useEffect(() => {
    (async function () {
      setloading(true);
      try {
        const { result } = await tradingAccountsService.getAccountTransactions(
          selectedAccountId,
          query
        );
        setdata(result.docs);
        setpageInfo(result);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, [query, selectedAccountId]);

  return (
    <section className="section">
      <h5 className="heading">
        {t("trading_accounts.recent_transactions.title")}
      </h5>
      <div className="table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col">
                {t(
                  "trading_accounts.recent_transactions.table_headers.account"
                )}
              </th>
              <th scope="col">
                {t("trading_accounts.recent_transactions.table_headers.type")}
              </th>
              <th scope="col">
                {t("trading_accounts.recent_transactions.table_headers.date")}
              </th>
              <th scope="col">
                {t(
                  "trading_accounts.recent_transactions.table_headers.transaction_id"
                )}
              </th>
              <th scope="col">
                {t("trading_accounts.recent_transactions.table_headers.mode")}
              </th>
              <th scope="col">
                {t("trading_accounts.recent_transactions.table_headers.amount")}
              </th>
              <th scope="col">
                {t("trading_accounts.recent_transactions.table_headers.status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={7} />}
            {!loading && data.length == 0 && (
              <tr>
                <td colSpan={7} className="text-md-center">
                  {t("trading_accounts.recent_transactions.table_body.no_data")}
                </td>
              </tr>
            )}
            {!loading &&
              data.map((transfer) => (
                <tr>
                  <td>
                    {transfer.transactionParties.account ??
                      transfer.transactionParties.fromAccount}
                  </td>
                  <td>{_.startCase(transfer.type?.toLowerCase())}</td>
                  <td>
                    {moment(transfer.createdAt).format("MMMM Do YYYY, h:mm")}
                  </td>
                  <td>{transfer.recordId}</td>
                  <td>
                    {_.startCase(
                      transfer.transactionParties.gateway?.toLowerCase()
                    )}
                  </td>
                  <td>{transfer.amount}</td>
                  <td>{_.startCase(transfer.status?.toLowerCase())}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CustomPagination
        totalPages={pageInfo.totalPages ?? 0}
        currentPage={query.page}
        onChangePage={(page) => setquery({ ...query, page })}
        maxPagesToShow={4}
      />
    </section>
  );
};

export default RecentTransfers;
