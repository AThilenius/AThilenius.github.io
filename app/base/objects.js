// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Object Helpers
 */

var isFunction = function(obj) {
  return obj && {}.toString.call(obj) === '[object Function]';
};

/**
 * Returns the child object of the curent object given by path. For example:
 * { foo: { bar: 42 }, baz: 99 }.get('foo.bar') => 42
 */
var getObjectPath = function(obj, path) {
  var fullPath = _(path.split('.')).filter(v => v);
  var cursor = obj;
  while (cursor && fullPath.length) {
    cursor = cursor[fullPath.shift()];
  }
  return cursor;
};

/**
 * Sets the child object of the curent object given by path to val. For example:
 * {}.set('foo.bar', 42) => { foo: { bar: 42 } }
 * { foo: function(x, y){...} }.set('foo', 42, 99) => invocation(42, 99)
 * { foo: function(x, y){...} }.set('foo', [42, 99]) => invocation(42, 99)
 */
var setObjectPath = function(obj, path, val) {
  if (!obj) {
    return undefined;
  }
  var fullPath = _(path.split('.')).filter(v => v);
  if (fullPath.length === 0) {
    return undefined;
  }
  var cursor = obj;
  // Walk up to the second to last element
  while (fullPath.length && fullPath.length > 1) {
    var pathPart = fullPath.shift();
    cursor[pathPart] = cursor[pathPart] || {};
    cursor = cursor[pathPart];
  }
  var lastPart = fullPath.shift();
  var lastElem = cursor[lastPart];
  if (isFunction(lastElem)) {
    // Invoke the function, return the results
    if (val instanceof Array) {
      return lastElem.apply(cursor, val);
    } else {
      // Apply the 3rd argument and onward
      return lastElem.apply(cursor, Array.prototype.slice.call(arguments, 2));
    }
  } else {
    // Just set the value and return the value
    cursor[lastPart] = val;
    return val;
  }
};
