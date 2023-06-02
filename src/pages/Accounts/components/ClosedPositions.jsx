import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import tradingAccountsService from "../../../services/tradingAccounts.service";
import CustomPagination from "../../../components/shared/Pagination/Pagination";
import { useTranslation } from "react-i18next";

const ClosedPositions = ({ selectedAccountId }) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [pageInfo, setpageInfo] = useState({});
  const [query, setquery] = useState({
    limit: 5,
    offset: 0,
    page: 1,
  });

  useEffect(() => {
    (async function () {
      setloading(true);
      try {
        const { result } =
          await tradingAccountsService.getAccountClosePositions(
            selectedAccountId,
            query
          );
        setdata(result.positions ?? []);
        setpageInfo(result);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, [query, selectedAccountId]);
  return (
    <section className="section">
      <h5 className="heading">{t("trading_accounts.positions.close_title")}</h5>
      <div className="table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.symbol")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.ticket")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.time")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.deal")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.volume")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.price")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.sl")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.tp")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.price")}
              </th>
              <th scope="col">
                {t("trading_accounts.positions.table_headers.profit")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={10} />}
            {!loading && data.length == 0 && (
              <tr>
                <td colSpan={10} className="text-md-center">
                  {t("trading_accounts.positions.table_body.no_close_data")}
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
      <CustomPagination
        totalPages={pageInfo.totalPages ?? 0}
        currentPage={query.page}
        onChangePage={(page) => setquery({ ...query, page })}
        maxPagesToShow={4}
      />
    </section>
  );
};

export default ClosedPositions;
