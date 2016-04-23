// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.viterbi_visualizer', [])
  .directive('atViterbiVisualizer', ['$timeout', '$rootScope', function(
    $timeout, $rootScope) {
    return {
      restrict: 'AE',
      templateUrl: 'app/directives/viterbi_visualizer/viterbi_visualizer.htm',
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
          var depth = 1;
          var lastBiggest = nodes[0];
          var lastNodes = [nodes[0]];
          data.forEach(timeStep => {
            var newNodes = [];
            // Find the max
            var newBiggest = _.chain(timeStep).keys().max(state =>
              timeStep[state]).value();
            var newBiggestNode = null;
            // Sorted keys (state names)
            _.chain(timeStep).keys().sortBy(k => k).each(state => {
              var prob = Math.floor(timeStep[state] * 1000) / 1000;
              var newNode = {
                id: `${state},${depth}`,
                label: `${state}\n${prob}`,
                shape: 'circle',
                level: depth,
                color: {
                  background: 'white',
                  border: state === newBiggest ? 'red' : 'black'
                },
              };
              if (state === newBiggest) {
                // Save the node
                newBiggestNode = newNode;
              }
              nodes.push(newNode);
              newNodes.push(newNode);
              edges.push({
                from: lastBiggest.id,
                to: newNode.id,
                arrows: 'to',
                pysics: true
              });
              // For all old nodes
              lastNodes.forEach(node => {
                if (node === lastBiggest) {
                  return;
                }
                edges.push({
                  from: node.id,
                  to: newNode.id,
                  arrows: 'to',
                  pysics: true,
                  dashes: true
                });
              });
            });
            lastBiggest = newBiggestNode;
            lastNodes = newNodes;
            depth++;
          });
          var container = document.getElementById('vis-graph');
          var options = {
            layout: {
              hierarchical: {
                direction: 'LR',
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
      }
    };
  }]);
