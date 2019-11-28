const fetch = require('node-fetch');

const getBlockchainInfo = async node => {
  const response = await makeGetRequest(`${node}/api/v0/settings`);
  return response;
};

const getNodeInfo = async node => {
  const response = await makeGetRequest(`${node}/api/v0/node/stats`);
  return response;
};

const getLeaderSchedules = async node => {
  const response = await makeGetRequest(`${node}/api/v0/leaders/logs`);
  return response;
};

const getStakeInfo = async node => {
  const response = await makeGetRequest(`${node}/api/v0/stake`);
  return response && response.stake ? response : undefined;
};

const getFragmentLogs = async node => {
  const response = await makeGetRequest(`${node}/api/v0/fragment/logs`);
  return response;
};

const checkConnection = async node => {
  try {
    await fetch(node, {
      method: 'GET'
    });
  } catch (error) {
    return false;
  }
  return true;
};

const makeGetRequest = async url => {
  try {
    const response = await fetch(url, {
      method: 'GET'
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log('ERROR: ', error);
  }
};

module.exports = {
  getBlockchainInfo,
  getNodeInfo,
  getLeaderSchedules,
  getStakeInfo,
  getFragmentLogs,
  checkConnection
};
