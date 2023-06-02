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
import { Trans, useTranslation } from "react-i18next";

const IBClientActivities = ({ onSelectClient }) => {
  const { t } = useTranslation()
  const [type, setType] = useState("live");

  const [clients, setClients] = useState([]);
  const [pageInfo, setpageInfo] = useState({});
  const [query, setquery] = useState({
    searchText: "",
    // fromDate: moment().subtract(2, "years").format("YYYY-MM-DD"),
    // toDate: moment().format("YYYY-MM-DD"),
    page: 1,
    limit: 10,
  });
  const [loading, setloading] = useState(false);
  const [accountsLoading, setAccountsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    if (pageInfo.page && pageInfo.page != query.page) fetchData();
  }, [query]);

  const fetchData = async () => {
    setloading(true);
    setClients([]);
    onSelectClient(null);
    try {
      const { result } = await ibService.getClientActivities(type, query);
      setClients(result.docs);
      setpageInfo({
        totalPages: result.totalPages,
        page: result.page,
      });
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

  const handleChangeClientType = (type) => {
    setquery({
      searchText: "",
      page: 1,
      limit: 10,
    });
    setType(type);
  };
  const classes = (t) => {
    if (t == type) return "btn-primary";
    return "bg-white border";
  };
  return (
    <section className="section">
      <div className="d-flex align-items-start align-items-md-end justify-content-between flex-column flex-md-row">

        <h5 className="heading">
          {t('ib_portal.client_activity.title', { context: type })}
        </h5>

        <div className="d-flex">
          <button
            disabled={loading}
            className={classNames("btn  border mb-3 me-2", classes("demo"))}
            onClick={() => handleChangeClientType("demo")}
          >
            {t('ib_portal.client_activity.demo')}
          </button>

          <button
            disabled={loading}
            className={classNames("btn  border mb-3", classes("live"))}
            onClick={() => handleChangeClientType("live")}
          >
            {t('ib_portal.client_activity.live')}

          </button>
        </div>
      </div>

      <div className="card px-3 py-4 p-lg-4  mb-3 custom-shadow">
        <h6 className="fw-semibold mb-4">
          {t('ib_portal.client_activity.filter_by')}
        </h6>
        <div className="row gx-2">
          <div className="col-12 col-md-6 col-lg-3">
            <FormGroup
              label={t('ib_portal.client_activity.filter.date_from')}

              type="date"
              value={query.fromDate}
              name="fromDate"
              onChange={handleQueryChange}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <FormGroup
              label={t('ib_portal.client_activity.filter.date_to')}
              type="date"
              value={query.toDate}
              name="toDate"
              onChange={handleQueryChange}
            />
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="" className="form-label">
              {t('ib_portal.client_activity.filter.search')}
            </label>
            <div className="input-group">
              <select
                id="disabledSelect"
                name="filter"
                className="form-select flex-grow-0 w-auto"
                onChange={handleQueryChange}
              >
                <option value="">{t('ib_portal.client_activity.filter.all')}</option>
                <option value="name">{t('ib_portal.client_activity.filter.by_name')}</option>
                <option value="email">{t('ib_portal.client_activity.filter.by_email')}</option>
              </select>
              <input
                type="text"
                className="form-control flex-grow-1"
                aria-label="Text input with dropdown button"
                name="searchText"
                onChange={handleQueryChange}
                value={query.searchText}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-2 align-self-end mb-2">
            <button
              className="btn btn-primary px-5 py-2 d-block w-100"
              onClick={fetchData}
              disabled={loading}
            >
              {t('ib_portal.client_activity.filter.search')}
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col">{t('ib_portal.client_activity.table.headings.name')}</th>
              <th scope="col">{t('ib_portal.client_activity.table.headings.mobile_number')}</th>
              <th scope="col">{t('ib_portal.client_activity.table.headings.email')}</th>
              <th scope="col">{t('ib_portal.client_activity.table.headings.status')}</th>
              <th scope="col" className="text-end">
                {t('ib_portal.client_activity.table.headings.date_time')}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={5} />}
            {!loading && !clients?.length && (
              <tr>
                <td colSpan={5}>
                  <Trans i18nKey="ib_portal.client_activity.table.body.empty" values={{ type }}>
                    You haven't have any <strong>{{ type }}</strong> clients.
                  </Trans>
                </td>
              </tr>
            )}
            {clients.map((c) => (
              <tr key={c._id}>
                <td
                  className="text-primary text-decoration-underline pointer"
                  onClick={() => onSelectClient({ ...c, type: type })}
                >
                  {c.firstName} {c.lastName}
                </td>
                <td>{c.phone}</td>

                <td>{c.email}</td>

                <td>{c.isActive ? "Active" : "Non Active"}</td>

                <td align="end">
                  {moment(c.createdAt).format("MMMM Do YYYY, h:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomPagination
        currentPage={query.page}
        maxPagesToShow={4}
        totalPages={pageInfo.totalPages}
        onChangePage={(page) => setquery({ ...query, page })}
      />
    </section>
  );
};

export default IBClientActivities;
