import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../components/shared/TableLoadingRow";
import _ from "lodash";
import transactionsService from "../../services/transactions.service";
import SelectGroup from "../../components/shared/SelectGroup/SelectGroup";
import { useSelector } from "react-redux";
import FormGroup from "../../components/shared/FormGroup/FormGroup";
import tradingAccountsService from "../../services/tradingAccounts.service";
import CustomPagination from "../../components/shared/Pagination/Pagination";
import { useTranslation } from "react-i18next";
const Reports = () => {
  const { t, i18n } = useTranslation();
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );
  const [data, setdata] = useState([]);
  const [pageInfo, setpageInfo] = useState({});
  const [query, setquery] = useState({
    type: "All",
    mt5Account: "All",
    startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    page: 1,
    limit: 10,
  });
  const [loading, setloading] = useState(false);
  const [accountsLoading, setAccountsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setloading(true);
      if (!liveAccounts) {
        setAccountsLoading(true);
        await tradingAccountsService.fetchLiveAccountsAndStore();
        setAccountsLoading(false);
      }
      try {
        const { result } = await transactionsService.getTransactions(query);
        setdata(result.docs);
        setpageInfo(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, [query]);

  const handleQueryChange = ({ target }) => {
    console.log(target.name, target.value);
    setquery({
      ...query,
      [target.name]: target.value,
    });
  };

  return (
    <section className="section">
      <h5 className="heading">{t("reports.title")}</h5>

      <div className="card px-3 py-4 p-lg-4  mb-3 custom-shadow">
        <h6 className="fw-semibold mb-4">{t("reports.filter_by")}</h6>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            <SelectGroup
              label={t("reports.form.type")}
              options={transactionTypes}
              hasInitial={false}
              value={query.type}
              titleText={i18n.language == 'ar' ? 'ar' : 'name'}
              name="type"
              onChange={handleQueryChange}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <SelectGroup
              hasInitial={false}
              label={t("reports.form.account")}
              options={[{ mt5Account: i18n.language == 'ar' ? 'الكل' : 'All' }, ...(liveAccounts ?? [])]}
              valueText="mt5Account"
              titleText="mt5Account"
              value={query.mt5Account}
              name="mt5Account"
              onChange={handleQueryChange}
              loading={accountsLoading}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <FormGroup
              label={t("reports.form.date_from")}
              type="date"
              value={query.startDate}
              name="startDate"
              onChange={handleQueryChange}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <FormGroup
              label={t("reports.form.date_to")}
              type="date"
              value={query.endDate}
              name="endDate"
              onChange={handleQueryChange}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col">{t("reports.table.headers.account")}</th>
              <th scope="col">{t("reports.table.headers.type")}</th>
              <th scope="col">{t("reports.table.headers.amount")}</th>
              <th scope="col">{t("reports.table.headers.gateway")}</th>
              <th scope="col">{t("reports.table.headers.date_created")}</th>
              <th scope="col">{t("reports.table.headers.status")}</th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={7} />}
            {!loading && data.length == 0 && (
              <tr>
                <td colSpan={7} align="center">
                  {t("reports.table.body.no_data")}
                </td>
              </tr>
            )}
            {!loading &&
              data.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.mt5Account}</td>
                  <td>{_.startCase(transaction.type?.toLowerCase())}</td>
                  <td>{transaction.amount}</td>
                  <td>{_.startCase(transaction.gateway?.toLowerCase())}</td>
                  <td>
                    {moment(transaction.createdAt).format("MMMM Do YYYY, h:mm")}
                  </td>
                  <td>{_.startCase(transaction.status?.toLowerCase())}</td>
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

export default Reports;

const transactionTypes = [
  { name: "All", value: "All", ar: "الكل" },
  { name: "Deposit", value: "DEPOSIT", ar: "إيداع" },
  { name: "Withdrawal", value: "WITHDRAWAL", ar: "سحب" },
  { name: "Internal Transfer", value: "INTERNAL_TRANSFER", ar: "تحويل داخلي" },
];
