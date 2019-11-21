import { blockchainInfo, nodeInfo } from '../content/mockApi';

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
