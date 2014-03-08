angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('UserIndexCtrl', function($scope, UserService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.users = UserService.all();
})


// A simple controller that shows a tapped item's data
.controller('UserDetailCtrl', function($scope, $stateParams, UserService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.user = UserService.get($stateParams.username);
});
