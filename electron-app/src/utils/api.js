import {
  blockchainInfo,
  nodeInfo,
  leaderSchedules,
  stakeInfo,
  fragmentLogs
} from '../content/mockApi';

const isMock = process.env.MOCK;

export const getBlockchainInfo = async node => {
  if (isMock) return blockchainInfo;
  const response = await makeGetRequest(`${node}/api/v0/settings`);
  return response;
};

export const getNodeInfo = async node => {
  if (isMock) return nodeInfo;
  const response = await makeGetRequest(`${node}/api/v0/node/stats`);
  return response;
};

export const getLeaderSchedules = async node => {
  if (isMock) return leaderSchedules;
  const response = await makeGetRequest(`${node}/api/v0/leaders/logs`);
  return response;
};

export const getStakeInfo = async node => {
  if (isMock) return stakeInfo;
  const response = await makeGetRequest(`${node}/api/v0/stake`);
  return response && response.stake ? response : undefined;
};

export const getFragmentLogs = async node => {
  if (isMock) return fragmentLogs;
  const response = await makeGetRequest(`${node}/api/v0/fragment/logs`);
  return response;
};

export const checkConnection = async node => {
  if (isMock) return true;
  const restUrl = `${node}/api/v0/settings`;
  try {
    const response = await fetch(restUrl, {
      method: 'GET'
    });
    await response.json();
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
    // TODO: handle error
  }
};
