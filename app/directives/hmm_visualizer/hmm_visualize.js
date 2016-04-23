// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.hmm_visualizer', [])
  .directive('atHmmVisualizer', ['$timeout', '$rootScope', function($timeout,
    $rootScope) {
    return {
      restrict: 'AE',
      templateUrl: 'app/directives/hmm_visualizer/hmm_visualizer.htm',
      scope: {
        ngModel: '=',
      },
      link: function($scope, $element, $attr) {
        var elem = $element.find('#render-canvas')[0];
        var network = null;

        $scope.$watch('ngModel', (oldVal, newVal) => {
          if (newVal) {
            $scope.redraw(newVal);
          }
        });

        $scope.redraw = function(data) {
          if (network) {
            network.destroy();
            network = null;
          }
          var nodes = [{
            id: 'start',
            label: 'Start',
            shape: 'diamond',
            color: {
              background: 'white',
              border: 'black'
            },
            fixed: true,
            level: 0
          }];
          var edges = [];
          // Observations
          data.observations.forEach(observation => {
            nodes.push({
              id: observation,
              label: `${observation}`,
              shape: 'circle',
              level: 2,
              color: {
                background: 'white',
                border: 'red'
              },
            });
          });
          // States
          data.states.forEach(state => {
            var startProb = data.startProbability[state];
            nodes.push({
              id: state,
              label: `${state}`,
              shape: 'circle',
              level: 1
            });
            edges.push({
              from: 'start',
              to: state,
              label: `${startProb * 100}%`,
              arrows: 'to',
              pysics: true
            });
            // Transition Probabuilities
            data.states.forEach(otherState => {
              var transProb = data.transitionProbability[state]
                [
                  otherState
                ];
              edges.push({
                from: state,
                to: otherState,
                label: `${transProb * 100}%`,
                arrows: 'to',
                pysics: true
              });
            });
            // Link to observations
            _(data.emissionProbability[state]).keys().forEach(
              observation => {
                var prob = data.emissionProbability[state][
                  observation
                ];
                edges.push({
                  from: state,
                  to: observation,
                  label: `${prob * 100}%`,
                  arrows: 'to',
                  pysics: true,
                  dashes: true
                });
              });
          });
          var container = document.getElementById('vis-graph');
          var options = {
            layout: {
              hierarchical: {
                direction: 'UD',
                sortMethod: 'directed'
              }
            },
            edges: {
              smooth: {
                // type: 'dynamic'
                enabled: false
              }
            },
          };
          network = new vis.Network(elem, {
            nodes,
            edges
          }, options);
        };
        //$scope.redraw(ngModel.$modelValue);
      }
    };
  }]);
