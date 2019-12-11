const { showTOSAgreement } = require('./lib/helpers');
const { agreeTOS } = require('./lib/interface');

if (!process.env.SKIP_PREINSTALL) showTOSAgreement(agreeTOS);
