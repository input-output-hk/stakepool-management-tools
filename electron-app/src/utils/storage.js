const Store = require('electron-store');

const schema = {
  acceptedTos: {
    type: 'boolean'
  }
};

export const store = new Store({ schema });
