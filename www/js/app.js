// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // the user tab has its own child nav-view and history
    .state('tab.user-index', {
      url: '/users',
      views: {
        'users-tab': {
          templateUrl: 'templates/user-index.html',
          controller: 'UserIndexCtrl'
        }
      }
    })

    .state('tab.user-detail', {
      url: '/user/:username',
      views: {
        'users-tab': {
          templateUrl: 'templates/user-detail.html',
          controller: 'UserDetailCtrl'
        }
      }
    })

    .state('tab.search', {
      url: '/search',
      views: {
        'search-tab': {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })

    .state('tab.search-user', {
      url: '/search-user/:username',
      views: {
        'search-tab': {
          templateUrl: 'templates/user-detail.html',
          controller: 'UserDetailCtrl'
        }
      }
    })

    .state('tab.login', {
      url: '/login',
      views: {
        'home-tab': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('tab.register', {
      url: '/register',
      views: {
        'home-tab': {
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })

    .state('tab.profile', {
      url: '/profile',
      views: {
        'home-tab': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/profile');

})

.run(function($rootScope, UserService, $state) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      if(toState.name != 'tab.register' && toState.name != 'tab.about') {
        UserService.check().then(function(){}, function() {
          $state.go('tab.login');
        });
      }
    });
});

