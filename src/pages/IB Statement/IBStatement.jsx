import React, { useEffect, useRef, useState } from "react";
import _, { startCase } from "lodash";
import IBClientStatement from "./components/ClientStatement";
import IBStatementTable from "./components/IBStatementTable";

const IBStatement = () => {
  const detailsRef = useRef();
  const [query, setquery] = useState({});
  const [selectedClient, setselectedClient] = useState(null);
  const [selectedClientApplication, setselectedClientApplication] =
    useState(null);

  useEffect(() => {
    if (selectedClient) detailsRef.current.scrollIntoView();
  }, [selectedClient]);

  return (
    <>
      <IBStatementTable
        onSelectClient={(client) => setselectedClient(client)}
        onQueryChange={(q) => setquery(q)}
      />
      {selectedClient && (
        <div ref={detailsRef}>
          <IBClientStatement selectedClient={selectedClient} query={query} />
        </div>
      )}
    </>
  );
};

export default IBStatement;
