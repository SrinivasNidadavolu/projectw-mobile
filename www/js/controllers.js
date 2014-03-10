angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, UserService, $state) {
  // "Users" is a service returning mock data (services.js)
  $scope.login = function(username, password) {
  	UserService.login(username, password).success(function() {
  		$state.go('tab.profile');
  	});
  };
})

.controller('RegisterCtrl', function($scope, UserService, $state) {
  // "Users" is a service returning mock data (services.js)
  $scope.signup = function(user) {
  	UserService.signup(user).then(function() {
  		UserService.login(user.username, user.password).success(function() {
  			$state.go('tab.profile');
  		});
  	});
  };
})

.controller('ProfileCtrl', function($scope, UserService, $state) {
  UserService.getCurrUser().then(function(me) {
  	$scope.me = me;
  	$scope.indexes = UserService.getIndexes(me.username).$object;
  });

  $scope.logout = function() {
  	UserService.logout().success(function() {
  		$state.go('tab.login');
  	});
  	
  }
})

// A simple controller that fetches a list of data from a service
.controller('UserIndexCtrl', function($scope, UserService) {
  $scope.users = UserService.getMyFollowers().$object;
})

// A simple controller that shows a tapped item's data
.controller('UserDetailCtrl', function($scope, $stateParams, UserService) {
  UserService.get($stateParams.username).then(function(user) {

  	$scope.user = user;

  	$scope.indexes = UserService.getIndexes(user.username).$object;

  	UserService.getMyFollowers().then(function(users) {
  			$scope.user.followed = _.some(users, {username: user.username});
  	});

  });

  $scope.toggleFollow = function() {
  	if($scope.user.followed) {
  		UserService.unfollow($scope.user.username).then(function() {
  			$scope.user.followed = false;
  		});
  	} else {
  		UserService.follow($scope.user.username).then(function() {
  			$scope.user.followed = true;
  		});
  	}
  };

})

// A simple controller that shows a tapped item's data
.controller('SearchCtrl', function($scope, $stateParams, UserService) {
  $scope.users = UserService.all().$object;
});
