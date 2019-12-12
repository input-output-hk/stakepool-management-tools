if (process.env.SKIP_PREINSTALL) return;

const { showTOSAgreement } = require('./lib/helpers');
const { agreeTOS } = require('./lib/interface');

showTOSAgreement(agreeTOS);
