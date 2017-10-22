'use strict';

/**
 * @ngdoc directive
 * @name ruckusApp.directive:clearSearch
 * @description
 * # clearSearch
 */
angular.module('ruckusApp')
  .directive('clearSearch', function () {
    return {
      template: '<span class="clear-search" ng-hide="searchTerm.length == 0" ng-click="clearTerm()"></span>',
      restrict: 'EA',
      scope: {
        searchTerm: '=',
        clear: '&'
      },
      link: function postLink(scope, element) {
       scope.clearTerm = function () {
         scope.searchTerm = '';
         scope.clear();
       }
      }
    };
  });
