'use strict';

module.exports = {
  removeEmpty: obj => {
    Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === undefined) && delete obj[key]);
    return obj;
  }
};
