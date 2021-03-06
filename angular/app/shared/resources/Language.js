(function() {
  'use strict';

  var Language = function($resource, apiBaseUrl) {

    var url,
        paramDefaults,
        actions;
        
  	url           = apiBaseUrl + '/languages/:id.json';
    paramDefaults = { id: '@id' };
    actions       = { 
              save: { method: 'POST' },
            update: { method: 'PUT' }
                    };

  	return { resource: $resource(url, paramDefaults, actions) };

  };

  angular
  	.module('angularApp')
  	.factory('Language', Language);

  Language.$inject = ['$resource', 'apiBaseUrl'];

})();
