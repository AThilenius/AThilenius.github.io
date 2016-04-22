// Copyright 2015 Alec Thilenius
// All rights reserved.

// NOTE!! If you change routes you also need to update /server/middleware,
// line 25 and below
angular.module('app').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/components/home/home.html',
        controller: 'homeController'
      });
    $urlRouterProvider.otherwise('home');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);
