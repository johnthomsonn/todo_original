const chalk = require('chalk')

exports.error = (err) => console.log(chalk.red(err));
exports.debug = (msg) => console.log(chalk.blue(msg));
