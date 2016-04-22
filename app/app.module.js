// Copyright 2015 Alec Thilenius
// All rights reserved.
var app = angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngMaterial',
  'ngMessages',
  'ngFileSaver',
  'dndLists',
  'ui.ace',
  'ui.router',
  'angular-md5',
  'ui.bootstrap.contextMenu',
  'ui.bootstrap',
  'xeditable'
]);

app.run([
  'editableOptions',
  function(editableOptions) {
    editableOptions.theme = 'bs3';
  }
]);

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() +
      input.substr(1).toLowerCase() : '';
  };
});

app.config(['$mdThemingProvider',
  function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red')
      .dark();
  }
]);
