/**
 * -------------- Logging Module --------------
 * Wraps chalk & console.log for stylish build logs.
 */
const chalk = require('chalk');
chalk.level = 3;
// Chalk styles
const reading = chalk.yellow;
const writing = chalk.magenta;
const success = chalk.green;
const error = chalk.red;

/**
 * Console log an item in the style of:
 * 'r': reading
 * 'w': writing
 * 's': success
 * @param {any} item 
 * @param {string} options 
 */
const log = (item, options) => {
  switch (options) {
    case 'r':
      console.log(reading(item));
      break;
    case 'w':
      console.log(writing(item));
      break;
    case 's':
      console.log(success(item));
      break;
    case 'e':
      console.log(error(item));
      break;
    default:
      console.log(item);
      break;
  }
}
module.exports = {
  log
}