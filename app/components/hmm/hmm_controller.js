// Copyright 2015 Alec Thilenius
// All rights reserved.

var forgeApp = angular.module('app');

forgeApp.controller('hmmController', [
  '$rootScope', '$scope', '$location', '$mdDialog', '$mdToast', '$timeout',
  function($rootScope, $scope, $location, $mdDialog, $mdToast, $timeout) {
    // Thinking through what needs to happen
    // Need to start off with a HMM definition
    //   Draw out the visualizer
    // Have the Viterbi algorithum (not in a function)
    //   Visualize the output
    //
    // Copy of default data
    $scope.pyHmmDataText = pyHmmDataText;
    $scope.pyObservationsText = pyObservationsText;
    $scope.pyViterbiText = pyViterbiText;
    $scope.hmm = null;
    $scope.viterbiRunData = null;
    $scope.updateHmmTimeout = null;
    $scope.updateViterbiTimeout = null;

    $scope.$watch('pyHmmDataText', () => {
      if ($scope.updateHmmTimeout) {
        $timeout.cancel($scope.updateHmmTimeout);
        $scope.updateHmmTimeout = null;
      }
      $scope.updateHmmTimeout = $timeout(() => $scope.updateHmmData(),
        500);
    });

    $scope.$watch('[pyHmmDataText, pyObservationsText, pyViterbiText]',
      () => {
        if ($scope.updateViterbiTimeout) {
          $timeout.cancel($scope.updateViterbiTimeout);
          $scope.updateViterbiTimeout = null;
        }
        $scope.updateViterbiTimeout = $timeout(() => $scope.updateViterbiData(),
          500);
      }, true);

    // Setup Skulpt
    Sk.configure({
      read: file => {
        if (!Sk.builtinFiles || !Sk.builtinFiles.files[file]) {
          throw 'File not found: ' + file;
        }
        return Sk.builtinFiles.files[file];
      }
    });

    $scope.updateHmmData = function() {
      var hmmDataModule = Sk.importMainWithBody('<stdin>', false,
        $scope.pyHmmDataText);
      var hmm = {
        startProbability: Sk.ffi.remapToJs(hmmDataModule.tp$getattr(
          'start_probability')),
        transitionProbability: Sk.ffi.remapToJs(hmmDataModule.tp$getattr(
          'transition_probability')),
        emissionProbability: Sk.ffi.remapToJs(hmmDataModule.tp$getattr(
          'emission_probability'))
      };
      // Get all states and observations
      hmm.states = _(hmm.transitionProbability).keys();
      hmm.observations = _.chain(hmm.emissionProbability)
        .values()
        .first()
        .keys()
        .value();
      $scope.hmm = hmm;
    };
    $scope.updateHmmData();

    $scope.updateViterbiData = function() {
      var viterbiModule = Sk.importMainWithBody('<stdin>', false,
        $scope.pyHmmDataText + '\n' + $scope.pyObservationsText + '\n' +
        $scope.pyViterbiText);
      $scope.viterbiRunData = Sk.ffi.remapToJs(viterbiModule.tp$getattr(
        'graph'));
    };
    $scope.updateViterbiData();

  }
]);
