import React from "react";
import "./Tables.scss";
export default function Table() {
  return (
    <>
      <div className="table-responsive-md">
        <table className="table table-alternate-spaced">
          <thead>
            <tr>
              <th style={{ width: "400px" }} scope="col">
                Product
              </th>
              <th scope="col">Client</th>
              <th scope="col">Amount</th>
              <th scope="col">VAT</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Apple Macbook PRO</b>
                <span className="d-block text-black-50 font-size-sm">
                  Lorem ipsum dolor sic amet
                </span>
              </td>
              <td>
                <span>Rupert Bryan</span>
              </td>
              <td className="font-size-lg font-weight-bold">
                <small>$</small>
                <span>2,495</span>
              </td>
              <td className="text-warning">
                <span>21%</span>
              </td>
              <td className="text-right">
                <button className="btn-neutral-first rounded-sm text-uppercase font-size-xs font-weight-bold mr-4 py-0 shadow-none hover-scale-sm w-auto d-40">
                  Pay Invoice
                </button>
                <button className="btn-neutral-primary mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                  icon
                </button>
                <button className="btn-neutral-first mx-1 rounded-sm shadow-none hover-scale-sm d-40 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                  icon
                </button>
              </td>
            </tr>
            <tr className="divider"></tr>
            <tr>
              <td>
                <b>Apple Macbook PRO</b>
                <span className="d-block text-black-50 font-size-sm">
                  Lorem ipsum dolor sic amet
                </span>
              </td>
              <td>
                <span>Rupert Bryan</span>
              </td>
              <td className="font-size-lg font-weight-bold">
                <small>$</small>
                <span>2,495</span>
              </td>
              <td className="text-warning">
                <span>21%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
