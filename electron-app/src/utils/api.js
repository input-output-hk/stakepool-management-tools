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
  try {
    const response = await makeGetRequest(`${node}/api/v0/settings`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNodeInfo = async node => {
  if (isMock) return nodeInfo;
  try {
    const response = await makeGetRequest(`${node}/api/v0/node/stats`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLeaderSchedules = async node => {
  if (isMock) return leaderSchedules;
  try {
    const response = await makeGetRequest(`${node}/api/v0/leaders/logs`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getStakeInfo = async node => {
  if (isMock) return stakeInfo;
  try {
    const response = await makeGetRequest(`${node}/api/v0/stake`);
    return response && response.stake ? response : undefined;
  } catch (error) {
    throw error;
  }
};

export const getFragmentLogs = async node => {
  if (isMock) return fragmentLogs;
  try {
    const response = await makeGetRequest(`${node}/api/v0/fragment/logs`);
    return response;
  } catch (error) {
    throw error;
  }
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
    throw error;
  }
};
