import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import TableLoadingRow from "../../components/shared/TableLoadingRow";
import _, { startCase } from "lodash";
import transactionsService from "../../services/transactions.service";
import SelectGroup from "../../components/shared/SelectGroup/SelectGroup";
import { useSelector } from "react-redux";
import FormGroup from "../../components/shared/FormGroup/FormGroup";
import tradingAccountsService from "../../services/tradingAccounts.service";
import classNames from "classnames";
import IBClientActivities from "./components/IBClientActivities";
import IBClientTradingAccounts from "./components/IBClientTradingAccounts";
import IBClientPositions from "./components/IBClientPositions";

const IBMyClients = () => {
  const detailsRef = useRef();
  const activityRef = useRef();

  const [selectedClient, setselectedClient] = useState(null);
  const [selectedClientApplication, setselectedClientApplication] =
    useState(null);

  useEffect(() => {
    if (selectedClient) detailsRef.current.scrollIntoView();
  }, [selectedClient]);
  useEffect(() => {
    if (selectedClientApplication) {
      activityRef.current.scrollIntoView();
    }
  }, [selectedClientApplication]);

  return (
    <>
      <IBClientActivities
        onSelectClient={(client) => setselectedClient(client)}
      />
      {selectedClient && (
        <div ref={detailsRef}>
          <IBClientTradingAccounts
            selectedClient={selectedClient}
            onSelectClientApplication={(applicationId) =>
              setselectedClientApplication(applicationId)
            }
          />
        </div>
      )}
      {selectedClientApplication && (
        <div ref={activityRef}>
          <IBClientPositions
            selectedClientApplication={selectedClientApplication}
          />
        </div>
      )}
    </>
  );
};

export default IBMyClients;
