import React, { useState } from "react";
import { useSelector } from "react-redux";
import SelectGroup from "../../../../components/shared/SelectGroup/SelectGroup";
import { useTranslation } from "react-i18next";

const WireTransfer = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [selectedBank, setSelectedBank] = useState(banksList[3]["IBAN Number"]);

  return (
    <div>
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className=" max-width mx-auto">
              <SelectGroup
                hasInitial={false}
                label={t("deposit.forms.select_bank")}
                options={banksList}
                valueText="IBAN Number"
                generateTitleText={(o) =>
                  `${o["Bank Name"]} - (${o["Currency"]})`
                }
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className=" mt-4 px-0">
          <div className="table-responsive banks-table">
            <table className="table table-striped small">
              <tbody>
                {Object.keys(
                  banksList.find((b) => b["IBAN Number"] == selectedBank)
                ).map((key) => (
                  <tr>
                    <th
                      className="fw-semibold text-dark px-3"
                      style={{ verticalAlign: "middle" }}
                    >
                      {key}
                    </th>
                    <td className="text-dark fw-normal">
                      {
                        banksList.find((b) => b["IBAN Number"] == selectedBank)[
                          key
                        ]
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireTransfer;

const banksList = [
  {
    ["Bank Name"]: "SBM Bank (Mauritius) Limited",
    ["Currency"]: "USD",
    ["Bank Account Name"]: "ACCUINDEX LIMITED-CLIENT ACCOUNT",
    ["Bank Address"]:
      "SBM Bank (Mauritius) Limited 6 th Floor SBM Tower Port Louis",
    ["Beneficiary (Company) Address"]:
      "The Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity 72201 Ebène, Republic of Mauritius",
    ["IBAN Number"]: "MU62STCB1170000000364807000USD",
    ["Bank Account Number"]: "50100000364807",
    ["Swift Code"]: "STCBMUMU",
  },
  {
    ["Bank Name"]: "SBM Bank (Mauritius) Limited",
    ["Currency"]: "EUR",
    ["Bank Account Name"]: "ACCUINDEX LIMITED-CLIENT ACCOUNT",
    ["Bank Address"]:
      "SBM Bank (Mauritius) Limited 6 th Floor SBM Tower Port Louis",
    ["Beneficiary (Company) Address"]:
      "The Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity 72201 Ebène, Republic of Mauritius",
    ["IBAN Number"]: "MU64STCB1170000000364821000EUR",
    ["Bank Account Number"]: "50100000364821",
    ["Swift Code"]: "STCBMUMU",
  },
  {
    ["Bank Name"]: "First Abu Dhabi Bank PJSC",
    ["Currency"]: "AED",
    ["Bank Account Name"]: "ACCUINDEX LIMITED",
    ["Bank Address"]: "DUBAI - UAE",
    ["Beneficiary (Company) Address"]:
      "The Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity 72201 Ebène, Republic of Mauritius",
    ["IBAN Number"]: "AE550351191204717938001",
    ["Bank Account Number"]: "1191204717938001",
    ["Swift Code"]: "NBADAEAA",
  },
  {
    ["Bank Name"]: "First Abu Dhabi Bank PJSC",
    ["Currency"]: "USD",
    ["Bank Account Name"]: "ACCUINDEX LIMITED",
    ["Bank Address"]: "DUBAI - UAE",
    ["Beneficiary (Company) Address"]:
      "The Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity 72201 Ebène, Republic of Mauritius",
    ["IBAN Number"]: "AE280351191204717938002",
    ["Bank Account Number"]: "1191204717938002",
    ["Swift Code"]: "NBADAEAA",
  },
  {
    ["Bank Name"]: "First Abu Dhabi Bank PJSC",
    ["Currency"]: "EUR",
    ["Bank Account Name"]: "ACCUINDEX LIMITED",
    ["Bank Address"]: "DUBAI - UAE",
    ["Beneficiary (Company) Address"]:
      "The Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity 72201 Ebène, Republic of Mauritius",
    ["IBAN Number"]: "AE980351191204717938003",
    ["Bank Account Number"]: "1191204717938003",
    ["Swift Code"]: "NBADAEAA",
  },
];
