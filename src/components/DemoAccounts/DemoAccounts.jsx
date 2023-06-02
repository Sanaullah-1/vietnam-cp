import React, { useEffect, useState } from "react";
import CopyIcon from "../../assets/icons/copy.png";
import ResetPasswordIcon from "../../assets/icons/rest-password.png";
import DepositIcon from "../../assets/icons/deposit.png";

import MenuIcon from "../../assets/icons/dots-menu.png";
import { Link } from "react-router-dom";
import tradingAccountsService from "../../services/tradingAccounts.service";
import { useDispatch, useSelector } from "react-redux";
import {
  demoAccountsLoaded,
  liveAccountsLoaded,
} from "../../redux/slices/tradingAccountsSlice";
import TableLoadingRow from "../shared/TableLoadingRow";
import classNames from "classnames";
import ChangeAccountPassword from "../../pages/Accounts/components/ChangeAccountPassword";
import { useTranslation } from "react-i18next";

const DemoAccounts = ({ selectable = false, onSelect }) => {
  const { t } = useTranslation();
  const [showChangePassowrdModal, setshowChangePassowrdModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setloading] = useState(false);

  const demoAccounts = useSelector(
    (state) => state.tradingAccounts.demoAccounts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!demoAccounts) {
      (async function () {
        setloading(true);

        try {
          const { result } = await tradingAccountsService.getDemoAccounts();
          if (result.length) {
            dispatch(demoAccountsLoaded(result));
          }
        } catch (error) {
          console.log(error);
        }
        setloading(false);
      })();
    }
  }, []);

  const handeChangePassword = (account) => {
    setSelectedAccount(account);
    setshowChangePassowrdModal(true);
  };

  return (
    <>
      <section className="section table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col">{t("trading_accounts.table_headers.account")}</th>
              <th scope="col">
                {t("trading_accounts.table_headers.leverage")}
              </th>
              <th scope="col">{t("trading_accounts.table_headers.equiti")}</th>
              <th scope="col">{t("trading_accounts.table_headers.balance")}</th>
              <th scope="col">{t("trading_accounts.table_headers.margin")}</th>
              <th scope="col">{t("trading_accounts.table_headers.credit")}</th>
              <th scope="col">
                {t("trading_accounts.table_headers.platforms")}
              </th>
              <th scope="col" className="text-end">
                {t("trading_accounts.table_headers.options")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={9} />}
            {!loading && !demoAccounts && (
              <tr>
                <td colSpan={10} className="text-md-center">
                  {t("trading_accounts.table_body.no_demo_data")}
                </td>
              </tr>
            )}
            {demoAccounts?.map((account) => (
              <tr key={account._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <span
                      className="py-1 px-2 text-danger small fw-bold me-3"
                      style={{ background: "#ffe2e2" }}>
                      {account.currency}
                    </span>
                    <div>
                      <div className="d-flex align-items-center ">
                        <img
                          src={CopyIcon}
                          alt=""
                          width={14}
                          className="pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(account.mt5Account)
                          }
                        />
                        <span
                          className={classNames(
                            "fw-semibold ms-2",
                            selectable && " btn btn-link p-0"
                          )}
                          onClick={selectable ? () => onSelect(account) : null}>
                          {account.mt5Account}
                        </span>
                      </div>
                      <span className="small text-muted">
                        {account.platform} {account.accountTypeId.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td>1:{account.leverage}</td>
                <td>{account.mt5?.Equity}</td>
                <td>{account.balance}</td>
                <td>{account.mt5?.Margin}</td>
                <td>{account.mt5?.Credit}</td>
                <td>
                  <div>
                    {account.platform}{" "}
                    <span className="ms-2">
                      {t("trading_accounts.table_body.webtrader")}
                    </span>
                  </div>
                </td>
                <td align="end">
                  <div>
                    <button
                      className="btn btn-light rounded-0 p-2"
                      onClick={() => handeChangePassword(account)}>
                      <img src={ResetPasswordIcon} alt="" width={21} />
                    </button>
                    {/* <button className="btn btn-light rounded-0 py-2 px-3 ms-2">
                      <img src={MenuIcon} alt="" width={4.5} />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ChangeAccountPassword
        selectedAccount={selectedAccount}
        show={showChangePassowrdModal}
        onClose={() => setshowChangePassowrdModal(false)}
      />
    </>
  );
};

export default DemoAccounts;
