import React, { useEffect, useState } from "react";
import CopyIcon from "../../assets/icons/copy.png";
import ResetPasswordIcon from "../../assets/icons/rest-password.png";
import DepositIcon from "../../assets/icons/deposit.png";

import MenuIcon from "../../assets/icons/dots-menu.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import tradingAccountsService from "../../services/tradingAccounts.service";
import { useDispatch, useSelector } from "react-redux";
import { liveAccountsLoaded } from "../../redux/slices/tradingAccountsSlice";
import TableLoadingRow from "../shared/TableLoadingRow";
import classNames from "classnames";
import _ from "lodash";
import ChangeAccountPassword from "../../pages/Accounts/components/ChangeAccountPassword";
import { Dropdown } from "react-bootstrap";
import ChangeAccountLeverage from "../../pages/Accounts/components/ChangeAccountLeverage";
import { useTranslation } from "react-i18next";
const LiveAccounts = ({ selectable = false, onSelect }) => {
  const { t } = useTranslation();
  const [showChangePassowrdModal, setshowChangePassowrdModal] = useState(false);
  const [showChangeLeverageModal, setshowChangeLeverageModal] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setloading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const liveAccounts = useSelector(
    (state) => state.tradingAccounts.liveAccounts
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!liveAccounts) {
      (async function () {
        setloading(true);
        try {
          const { result } = await tradingAccountsService.getLiveAccounts();
          // if (result.length) {
          dispatch(liveAccountsLoaded(result));
          // }
        } catch (error) {
          console.log(error);
        }
        setloading(false);
      })();
    }
    const account = searchParams.get("account");
    if (account) {
      onSelect(liveAccounts?.find((acc) => acc.mt5Account == account));
    }
  }, []);
  const handeChangePassword = (account) => {
    setSelectedAccount(account);
    setshowChangePassowrdModal(true);
  };
  const handeChangeLeverage = (account) => {
    setSelectedAccount(account);
    setshowChangeLeverageModal(true);
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
              <th scope="col">{t("trading_accounts.table_headers.action")}</th>
              <th scope="col" className="text-end">
                {t("trading_accounts.table_headers.options")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={9} />}
            {!loading && !liveAccounts?.length && (
              <tr>
                <td colSpan={10} className="text-md-center">
                  {t("trading_accounts.table_body.no_live_data")}
                </td>
              </tr>
            )}
            {liveAccounts?.map((account) => (
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
                            " btn btn-link p-0"
                          )}
                          onClick={
                            selectable
                              ? () => onSelect(account)
                              : () =>
                                  navigate(
                                    "/accounts?account=" + account.mt5Account
                                  )
                          }>
                          {account.mt5Account}
                        </span>
                      </div>
                      <span className="small text-muted">
                        {account.platform} {account.accountTypeId && account.accountTypeId.name}
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
                      {" "}
                      {t("trading_accounts.table_body.webtrader")}
                    </span>
                  </div>
                </td>
                <td>
                  <Link
                    to={`/deposit?account=${account.mt5Account}`}
                    className="btn btn-sm btn-outline-light text-dark fw-semibold">
                    <img src={DepositIcon} width={13} className="me-1" />{" "}
                    {t("trading_accounts.table_body.deposit")}
                  </Link>
                </td>
                <td align="end">
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-light rounded-0 p-2"
                      onClick={() => handeChangePassword(account)}>
                      <img src={ResetPasswordIcon} alt="" width={21} />
                    </button>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        className="btn btn-light rounded-0 py-2 px-3 ms-2 no-toggle"
                        id="dropdown-basic">
                        <img src={MenuIcon} alt="" width={4.5} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handeChangeLeverage(account)}>
                          {t("trading_accounts.table_body.change_leverage")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {liveAccounts && liveAccounts.length != 0 && (
            <tfoot>
              <tr>
                <td colSpan={9} className="empty-row"></td>
              </tr>
              <tr className="custom-shadow">
                <td>
                  <div className="d-flex align-items-center small">
                    <span
                      className="py-1 px-2 text-primary small fw-bold me-3"
                      style={{ background: "#cfe1ff" }}>
                      USD
                    </span>
                    <span className="fw-semibold text-dark">
                      {" "}
                      {t("trading_accounts.table_body.total")}
                    </span>
                  </div>
                </td>
                <td></td>
                <td>
                  {_.sumBy(liveAccounts, function (o) {
                    return parseFloat(o.mt5?.Equity);
                  }).toFixed(2)}
                </td>
                <td>
                  {_.sumBy(liveAccounts, function (o) {
                    return parseFloat(o.balance);
                  }).toFixed(2)}
                </td>
                <td>
                  {_.sumBy(liveAccounts, function (o) {
                    return parseFloat(o.mt5?.Margin);
                  }).toFixed(2)}
                </td>
                <td>
                  {_.sumBy(liveAccounts, function (o) {
                    return parseFloat(o.mt5?.Credit);
                  }).toFixed(2)}
                </td>
                <td colSpan={3}></td>
              </tr>
              <tr>
                <td colSpan={9} className="empty-row"></td>
              </tr>
              {/* <tr className="custom-shadow">
                <td>
                  <div className="d-flex align-items-center small">
                    <span
                      className="py-1 px-2 text-primary small fw-bold me-3"
                      style={{ background: "#cfe1ff" }}>
                      USD
                    </span>
                    <span className="fw-semibold text-dark">
                      {t("trading_accounts.table_body.copy_trading_account")}
                    </span>
                  </div>
                </td>
                <td></td>
                <td>00.00</td>
                <td>00.00</td>
                <td>00.00</td>
                <td>00.00</td>
                <td colSpan={3}></td>
              </tr> */}
            </tfoot>
          )}
        </table>
      </section>
      <ChangeAccountPassword
        selectedAccount={selectedAccount}
        show={showChangePassowrdModal}
        onClose={() => setshowChangePassowrdModal(false)}
      />
      <ChangeAccountLeverage
        selectedAccount={selectedAccount}
        show={showChangeLeverageModal}
        onClose={() => setshowChangeLeverageModal(false)}
      />
    </>
  );
};

export default LiveAccounts;
