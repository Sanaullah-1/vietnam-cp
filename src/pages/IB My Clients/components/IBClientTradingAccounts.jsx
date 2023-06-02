import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import ibService from "../../../services/ib.service";
import { useTranslation } from "react-i18next";

const IBClientTradingAccounts = ({
  selectedClient,
  onSelectClientApplication,
}) => {
  const { t } = useTranslation()
  const [loading, setloading] = useState(false);
  const [accounts, setaccounts] = useState([]);

  useEffect(() => {
    (async function () {
      setaccounts([]);
      setloading(true);
      try {
        const { result } = await ibService.getClientTradingAccounts(
          selectedClient
        );
        setaccounts(result);
      } catch (error) { }
      setloading(false);
    })();
  }, [selectedClient]);

  return (
    <section className="section">
      <div className="d-flex align-items-start align-items-md-end justify-content-between flex-column flex-md-row">
        <h5 className="heading text-capitalize">
          {t('ib_portal.client_trading_accounts.title')} <span>{selectedClient.firstName}</span>
        </h5>
      </div>

      <div className="table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col"> {t('ib_portal.client_trading_accounts.table.headings.name')}</th>
              <th scope="col">{t('ib_portal.client_trading_accounts.table.headings.account_type')}</th>
              <th scope="col">{t('ib_portal.client_trading_accounts.table.headings.account_no')}</th>
              <th scope="col">{t('ib_portal.client_trading_accounts.table.headings.structure')}</th>
              <th scope="col">{t('ib_portal.client_trading_accounts.table.headings.currency')}</th>
              <th scope="col">{t('ib_portal.client_trading_accounts.table.headings.paltform')}</th>
              <th scope="col">{t('ib_portal.client_trading_accounts.table.headings.balance')}</th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={7} />}
            {!loading && !accounts?.length && (
              <tr>
                <td colSpan={10} className="text-md-center">
                  {t('ib_portal.client_trading_accounts.table.body.empty')}
                </td>
              </tr>
            )}
            {accounts.map((acc) => (
              <tr key={acc._id}>
                <td
                  className="text-primary text-decoration-underline pointer"
                  onClick={() => onSelectClientApplication(acc._id)}
                >
                  {acc.firstName} {acc.lastName}
                </td>
                <td>{acc.accountTypeId.name}</td>
                <td>{acc.mt5Account}</td>
                <td>{acc.structureName}</td>
                <td>{acc.currency}</td>
                <td>{acc.platform}</td>
                <td>{acc.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default IBClientTradingAccounts;
