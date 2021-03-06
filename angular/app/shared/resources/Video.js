(function() {
  'use strict';

  var Video;
  Video = function ($resource, apiBaseUrl, $q, Collocation) {

    var url,
      paramDefaults,
      actions;

    url = apiBaseUrl + '/videos/:id.json';
    paramDefaults = {id: '@id'};
    actions = {
      save: {method: 'POST'},
      update: {method: 'PUT'}
    };

    // ------------------------

    function fetch(resource, videoId) {
      var deferred = $q.defer();

      this.resource.get({resource: resource, videoId: videoId}, function (res) { // jshint ignore:line

        // unpack JSON object
        res.resource = angular.fromJson(res.resource);

        deferred.resolve(res);

      }, function (res) {
        console.log('Error', res);
      });

      return deferred.promise;
    }

    function getVideoError(res) {
      console.log('Error', res);
    }

    function getColError(res) {
      console.log('Error', res);
    }

    function setVideo(_data, shouldWrapCollocations) {

      var deferred = $q.defer();

      var videoId = isNaN(_data) ? _data.selectedVideo.id : _data;

      this.resource.get({id: videoId}, function (res) { // jshint ignore:line

        var data = {};

        data.video = angular.fromJson(res.video);
        data.scripts = angular.fromJson(res.video_scripts);
        data.tabs = [];

        angular.forEach(data.scripts, function (s) {

          var vs = {};
          vs.id = s.id;
          vs.title = s.language.name;
          vs.content = s.content;
          vs.original = s.original;

          if (s.original) {

            vs.active = true;

            Collocation.resource.get({video_script_id: vs.id}, function (res) {

              data.collocations = angular.fromJson(res.collocations);

              if (shouldWrapCollocations) {

                // wraps in <span> tags and give 'collocation' class
                vs.content = Collocation.wrap(vs.content, data.collocations, 'span', 'collocation');

                // initialize values for collocation panel
                data.selectedQuote = '...';
                data.selectedDescription = 'Select a collocation from the above script!';

              }

              deferred.resolve(data);

            }, getColError);
          } // if s.original

          data.tabs.push(vs);

        }); // each
      }, getVideoError);

      return deferred.promise;

    }

    // ------------------------

    return {
      resource: $resource(url, paramDefaults, actions),
      setVideo: setVideo,
      fetch: fetch
    };

  };

  angular
    .module('angularApp')
    .factory('Video', Video);

  Video.$inject = ['$resource', 'apiBaseUrl', '$q', 'Collocation'];

})();
