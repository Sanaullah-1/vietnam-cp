import classNames from "classnames";
import { startCase } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import ibService from "../../../services/ib.service";
import { Trans, useTranslation } from "react-i18next";

const IBRecentClients = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("live");
  const [clients, setClients] = useState([]);
  const classes = (t) => {
    if (t == type) return "btn-primary";
    return "bg-white border";
  };

  useEffect(() => {
    console.log("again");
    (async function () {
      setLoading(true);
      try {
        const { result } = await ibService.getRecentClients(type);
        setClients(result.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [type]);

  const handleChangeAccountType = (t) => {
    if (t != type) {
      setClients([]);
      setType(t);
    }
  };
  return (
    <>
      <section className="section">
        <div className="d-flex align-items-start align-items-md-end justify-content-between flex-column flex-md-row">

          <h5 className="heading text-capitalize">
            {t('ib_portal.recent_clients.title', { context: type })}
          </h5>

          <div className="d-flex">
            <button
              className={classNames("btn  border mb-3 me-2", classes("demo"))}
              onClick={() => handleChangeAccountType("demo")}
            >
              {t('ib_portal.recent_clients.demo')}

            </button>

            <button
              className={classNames("btn  border mb-3", classes("live"))}
              onClick={() => handleChangeAccountType("live")}
            >
              {t('ib_portal.recent_clients.live')}

            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-borderless custom-shadow">
            <thead>
              <tr>
                <th scope="col">
                  {t('ib_portal.recent_clients.table.headings.name')}
                </th>
                <th scope="col">{t('ib_portal.recent_clients.table.headings.mobile_number')}</th>
                <th scope="col">{t('ib_portal.recent_clients.table.headings.email')}</th>
                <th scope="col">{t('ib_portal.recent_clients.table.headings.status')}</th>
                <th scope="col" className="text-end">
                  {t('ib_portal.recent_clients.table.headings.date_time')}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableLoadingRow colSpan={5} />}
              {!loading && !clients?.length && (
                <tr>
                  <td colSpan={10} className="text-md-center">
                    {t('ib_portal.recent_clients.table.empty', { context: type })}
                  </td>
                </tr>
              )}
              {clients.map((c) => (
                <tr key={c._id}>
                  <td>
                    {c.firstName} {c.lastName}
                  </td>
                  <td>{c.phone}</td>

                  <td>{c.email}</td>

                  <td>{c.isActive ? t('ib_portal.recent_clients.table.body.active') : t('ib_portal.recent_clients.table.body.non_active')}</td>

                  <td align="end">
                    {moment(c.createdAt).format("MMMM Do YYYY, h:mm")}
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

export default IBRecentClients;
