// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Array Helpers
 */

/**
 * Runs a doFun on each item in a tree structure, where children are denoted by
 * 'fieldName'. An optional filter function can be provided as the second
 * argument, filtering what objects the doFun is called on, not what objects are
 * Crecursed downward.
 * Can be called in the forms:
 * eachRecursive(fieldName, doFunction)
 * eachRecursive(fieldName, filterFunction, doFuncation)
 */
Array.prototype.eachRecursive = function(fieldName, filterOrDoFun, doFun) {
  var filter = doFun ? filterOrDoFun : null;
  doFun = doFun || filterOrDoFun;
  var doArrayRecursive = function(arr) {
    if (!arr || !(arr instanceof Array)) {
      return;
    }
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      // Filter if provided
      if (!filter || filter(item)) {
        doFun(item);
      }
      // Recurse down children
      var children = item[fieldName];
      if (children && children instanceof Array) {
        doArrayRecursive(children);
      }
    }
  };
  doArrayRecursive(this);
};
