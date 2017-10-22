'use strict';

/**
 * @ngdoc function
 * @name ruckusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ruckusApp
 */
angular.module('ruckusApp')
  .controller('MainCtrl', ['$scope', 'CommunicationService', function ($scope, CommunicationService) {
    CommunicationService.initSC();

    $scope.searchTerm = '';
    $scope.tracksNotFound = false;

    $scope.getFirstPage = function() {
      $scope.tracksNotFound = false;

      CommunicationService.getTracks($scope.searchTerm).then(
        function(result){
          $scope.tracks = result.collection;
          $scope.hasMore = result.next_href || null;
          if ($scope.tracks.length === 0) {
            $scope.tracksNotFound = true;
          }
        },function (err) {
          console.log(err);
          $scope.tracks = [];
        }
      );
    };

    $scope.keyPressed = function(evt) {
      if (evt.keyCode === 13) {
        $scope.getFirstPage();
      }
    };

    $scope.pageNum = 0;
    $scope.hasMore = false;

    $scope.getNextTracks = function () {
      getTracks(++$scope.pageNum);
    };

    $scope.getPrevTracks = function () {
      getTracks(--$scope.pageNum);
    };

    $scope.clearTrackList = function() {
      $scope.tracks = [];
    };

    $scope.playTrack = function(track) {
      CommunicationService.playTrack(track);
    };


    // private functions

    function getTracks(page) {
      CommunicationService.getNextTracks(page).then(
        function(result){
          $scope.tracks = result.collection;
          $scope.hasMore = result.next_href || null;
        }, function (err) {
          console.log(err);
        }
      );
    }
  }]);
