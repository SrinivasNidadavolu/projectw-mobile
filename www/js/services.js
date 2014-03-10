angular.module('starter.services', ['restangular'])

//Configure RestangluarProvider
.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://projectw.herokuapp.com');
  RestangularProvider.setDefaultHttpFields({withCredentials: true});  
})

/**
 * A simple example service that returns some data.
 */
.factory('UserService', function(Restangular, $http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return Restangular.all('users').getList();
    },
    getMyFollowers: function() {
      return Restangular.one('users', 'me').getList('follows');
    },
    get: function(username) {
      // Simple index lookup
      return Restangular.one('users', username).get();
    },
    check: function(unauthFn) {
      // Simple index lookup
      return Restangular.one('users', 'me').get();
    },
    getCurrUser: function() {
      return Restangular.one('users', 'me').get();
    },
    getIndexes: function(username) {
      return Restangular.one('users', username).getList("indexes"); 
    },
    login: function(username, password) {
      var xsrf = 'username='+username+'&password='+password;
      return $http({
        method: 'POST',
        url: 'http://projectw.herokuapp.com/login.html',
        data: xsrf,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        withCredentials: true
      });
    },
    signup: function(user) {
      return Restangular.all('users').post(user);
    },
    logout: function() {
      return $http({
        method: 'POST',
        url: 'http://projectw.herokuapp.com/logout',
        withCredentials: true
      });      
    },
    follow: function(username) {
      return Restangular.one('users', 'me')
              .one('follows', username)
              .put();
     
    },
    unfollow: function(username) {
      return Restangular.one('users', 'me')
              .one('follows', username)
              .remove();
    }
  }
});
