'use strict';

/**
 * @ngdoc service
 * @name ruckusApp.communication
 * @description
 * # communication
 * Service in the ruckusApp.
 */
angular.module('ruckusApp')
  .service('CommunicationService', ['$q', function ($q) {
    var pageSize = 5;
    var next_page;
    var tracks = [];
    var searchFor;

    this.initSC = function() {
      SC.initialize({
        client_id: 'e59d8b005900e38649c1882b87cd828d'
      });
    };

    this.getTracks = function(search) {
      var deferred  = $q.defer();
      tracks = [];
      searchFor = search;
      SC.get('/tracks', { limit: pageSize, q: search, linked_partitioning: 1 }).then(
        function(result) {
          if (result.next_href) {
            next_page = result.next_href.replace('https://api.soundcloud.com', '');
          }
          deferred.resolve(result);
      }, function (err) {
        console.log(err);
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.getNextTracks = function(page) {
      var deferred  = $q.defer();

      SC.get('/tracks', { limit: pageSize, q: searchFor, linked_partitioning: 1, offset: pageSize*page }).then(
        function(result) {
          next_page = result.next_href;
          deferred.resolve(result);
      },function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.playTrack = function(track) {
      SC.oEmbed(track.uri, {
        element: document.getElementById('player'),
        auto_play: true
      });
    };
  }]);
