import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import _, { startCase, update } from "lodash";
import transactionsService from "../../../services/transactions.service";
import { useSelector } from "react-redux";
import FormGroup from "../../../components/shared/FormGroup/FormGroup";
import tradingAccountsService from "../../../services/tradingAccounts.service";
import classNames from "classnames";
import ibService from "../../../services/ib.service";
import PaginationComponent from "../../../components/shared/Pagination/Pagination";
import CustomPagination from "../../../components/shared/Pagination/Pagination";
import SelectGroup from "../../../components/shared/SelectGroup/SelectGroup";
import { useTranslation } from "react-i18next";

const IBStatementTable = ({ onSelectClient, onQueryChange }) => {
  const { t, i18n } = useTranslation()
  const [data, setData] = useState(null);
  const [ibAccounts, setibAccounts] = useState([]);
  const [query, setquery] = useState({
    fromDate: moment().subtract(3, "months").format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
    clientType: clientTypes[0]._id,
    masterMt5Account: "",
    platform: "MT5",
    page: 1,
    limit: 10,
  });
  const [loading, setloading] = useState(false);
  const [accountsLoading, setAccountsLoading] = useState(false);

  useEffect(() => {
    fetchIbAccounts();
  }, []);

  const fetchIbAccounts = async () => {
    try {
      setloading(true);
      const { result } = await ibService.getIbAccounts();
      setibAccounts(result && result.filter(obj => obj!== null));
      setquery({
        ...query,
        masterMt5Account: result[0].mt5Account,
      });
    } catch (error) { }
    setloading(false);
  };
  const fetchData = async () => {
    setloading(true);
    setData([]);
    onSelectClient(null);
    onQueryChange(query);
    try {
      const { result } = await ibService.getStatement(query);
      console.log(result);
      setData(result);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const handleQueryChange = ({ target }) => {
    const updatedQuery = { ...query };
    if (target.name == "filter" && target.value == "") {
      delete updatedQuery.filter;
    } else {
      updatedQuery[target.name] = target.value;
    }
    updatedQuery.page = 1;
    setquery(updatedQuery);
  };

  return (
    <section className="section">
      <h5 className="heading">{t('ib_portal.statement.title')}</h5>
      <div className="card px-3 py-4 p-lg-4  mb-3 custom-shadow">
        <h6 className="fw-semibold mb-4">{t('ib_portal.statement.filter_by')}</h6>
        <div className="row gx-2">
          <div className="col-12 col-md-6 col-xl-2">
            <SelectGroup
              label="IB Account"
              loading={loading}
              options={ibAccounts}
              valueText="mt5Account"
              titleText="mt5Account"
              hasInitial={false}
              onChange={(e) =>
                setquery({ ...query, masterMt5Account: e.target.value })
              }
              value={query.masterMt5Account}
            // errors={errors}
            // onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <FormGroup
              label={t('ib_portal.statement.from_date')}
              type="date"
              value={query.fromDate}
              name="fromDate"
              onChange={handleQueryChange}
            />
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <FormGroup
              label={t('ib_portal.statement.to_date')}
              type="date"
              value={query.toDate}
              name="toDate"
              onChange={handleQueryChange}
            />
          </div>
          <div className="col-12 col-md-6 col-xl-2">
            <SelectGroup
              hasInitial={false}
              label={t('ib_portal.statement.account_type')}
              value={query.clientType}
              name="clientType"
              valueText="_id"
              titleText={i18n.language == 'ar' ? 'ar' : "name"}
              onChange={handleQueryChange}
              options={clientTypes.filter((a) => a._id != 3)}
            />
          </div>

          <div className="col-12 col-md-6 col-xl-2 align-self-end mb-2">
            <button
              className="btn btn-primary px-5 py-2 d-block w-100"
              onClick={fetchData}
              disabled={loading}
            >
              {t('ib_portal.statement.search')}
            </button>
          </div>
        </div>
      </div>
      {data && (
        <div className="table-responsive">
          <table className="table table-borderless custom-shadow">
            <thead>
              <tr>
                <th scope="col">{t('ib_portal.statement.table.headings.name')}</th>
                <th scope="col">{t('ib_portal.statement.table.headings.type')}</th>
                <th scope="col">{t('ib_portal.statement.table.headings.email')}</th>
                <th scope="col">{t('ib_portal.statement.table.headings.ib_commission')}</th>
                <th scope="col">{t('ib_portal.statement.table.headings.ib_repate')}</th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableLoadingRow colSpan={5} />}
              {!loading && !data?.length && (
                <tr>
                  <td colSpan={10} className="text-md-center">
                    {t('ib_portal.statement.table.body.empty')}
                  </td>
                </tr>
              )}
              {data.map((c) => (
                <tr key={c._id}>
                  <td
                    className="text-primary text-decoration-underline pointer"
                    onClick={() => onSelectClient(c)}
                  >
                    {c.firstName} {c.lastName}
                  </td>
                  <td>
                    {clientTypes.find((ct) => ct._id == c.clientType)?.name}
                  </td>

                  <td>{c.email}</td>

                  <td>{c.partnership.totalCommission}</td>
                  <td>{c.partnership.totalRebate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
const clientTypes = [
  {
    name: "All",
    _id: "1,2,3,10",
    ar: "الكل",
  },
  {
    name: "Individual",
    _id: 1,
    ar: "فردي",
  },
  {
    name: "Individual-IB",
    _id: 2,
    ar: "فردي - وسيط",
  },
  {
    name: "Corporate-IB",
    _id: 10,
    ar: "شركة - وسيط",
  },
  {
    name: "Individual / Individual-IB",
    _id: 3,
    ar: "فردي / فردي - وسيط",
  },
];

export default IBStatementTable;
