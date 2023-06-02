import axios from "axios";

export async function getAccountSummary() {
  try {
    const { data } = await axios.get("/ib/summary");
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getIbAccounts() {
  try {
    const { data } = await axios.get("/ib/ib-application");
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getRecentClients(type) {
  try {
    const { data } = await axios.get(
      `/ib/recent-${type}-clients?limit=5&page=1`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getClientActivities(type, query) {
  try {
    const { data } = await axios.get(`/ib/${type}-clients`, { params: query });
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getClientTradingAccounts(client) {
  try {
    const { data } = await axios.get(
      `/ib/${client._id}/${client.type}-applications`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getRecentTransaction(type) {
  try {
    const { data } = await axios.get(
      `/ib/transactions?type=${type.toUpperCase()}&limit=5&page=1`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getStructures() {
  try {
    const { data } = await axios.get(`/ib/structures`);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getClientsLiveApplications() {
  try {
    const { data } = await axios.get(`/ib/live-applications`);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function internalTransfer(values) {
  try {
    const { data } = await axios.post(`/ib/internal-transfer`, values);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getClientTrades(applicationId, type) {
  try {
    const { data } = await axios.get(`/ib/${applicationId}/${type}-positions?limit=10&offset=0&ib=true`);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getStatement(query) {
  try {
    const { data } = await axios.get(`/ib/statement`, { params: query });
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export async function getClientStatement(clientId, query) {
  try {
    delete query.clientTypes
    const { data } = await axios.get(`/ib/statement/${clientId}`, { params: query });
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}
export default {
  getAccountSummary,
  getIbAccounts,
  getRecentClients,
  getRecentTransaction,
  getClientActivities,
  getClientTradingAccounts,
  getStructures,
  getClientsLiveApplications,
  internalTransfer,
  getClientTrades,
  getStatement,
  getClientStatement
};
