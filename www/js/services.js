angular.module('starter.services', ['restangular'])

.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://projectw.herokuapp.com');
})

/**
 * A simple example service that returns some data.
 */
.factory('UserService', function(Restangular) {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return Restangular.all('users').getList().$object;
    },
    get: function(username) {
      // Simple index lookup
      return Restangular.one('users', username).get().$object;
    }
  }
});
