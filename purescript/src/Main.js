/* global exports */
"use strict";

// module Main

exports.closeInterface = function (readline) {
  return function () {
    readline.close();
  };
};
