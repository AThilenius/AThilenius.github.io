// Copyright 2015 Alec Thilenius
// All rights reserved.

// Override ACE base path
var requireImpl = ace.require != null ? ace.require : require;
ace.config.set('basePath', '/assets/ace');
var Range = requireImpl('ace/range').Range;

// The main App
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
  'xeditable',
  'thilenius.hmm_visualizer',
  'thilenius.viterbi_visualizer'
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
