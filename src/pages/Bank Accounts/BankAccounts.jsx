import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import bankAccountService from "../../services/bankAccount.service";
import TableLoadingRow from "../../components/shared/TableLoadingRow";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BankAccounts = () => {
  const { t } = useTranslation();
  const [banks, setbanks] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    (async function () {
      setloading(true);
      try {
        const { result } = await bankAccountService.getBankAccounts();
        setbanks(result.docs);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, []);
  return (
    <section className="section">
      <h5 className="heading">{t("bank_accounts.title")}</h5>
      <div className="table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col">
                {t("bank_accounts.table.headers.holder_name")}{" "}
              </th>
              <th scope="col">{t("bank_accounts.table.headers.bank_name")} </th>
              <th scope="col">{t("bank_accounts.table.headers.currency")}</th>
              <th scope="col">{t("bank_accounts.table.headers.operations")}</th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={7} />}
            {!loading && banks.length == 0 && (
              <tr>
                <td colSpan={7} className="text-md-center">
                  {t("bank_accounts.table.body.no_data")}
                </td>
              </tr>
            )}
            {!loading &&
              banks.map((bank) => (
                <tr key={bank._id}>
                  <td>{bank.accountHolderName}</td>
                  <td>{bank.beneficiaryBankName}</td>
                  <td>{bank.currency}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        to="/bank-accounts/update"
                        state={{ bank }}
                        className="btn btn-light rounded-0 p-2">
                        {t("bank_accounts.table.body.update_cta")}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Link
        to="/bank-accounts/new"
        className="btn btn-link fw-semibold fs-6 px-0">
        + {t("bank_accounts.new_cta")}
      </Link>
    </section>
  );
};

export default BankAccounts;
