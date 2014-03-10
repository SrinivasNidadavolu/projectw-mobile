angular.module('starter.controllers', [])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            withCredentials: true
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}])

.controller('LoginCtrl', function($scope, UserService, $state) {
  // "Users" is a service returning mock data (services.js)
  $scope.login = function(username, password) {
  	UserService.login(username, password).success(function() {
  		$state.go('tab.profile');
  	});
  };
})

.controller('LogoutCtrl', function($scope, UserService, $state) {
  
  $scope.logout = function() {
  	UserService.logout().success(function() {
  		$state.go('logintab.login');
  	});
  }
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

.controller('ProfileCtrl', function($scope, UserService, $state, $ionicModal, fileUpload) {
  UserService.getCurrUser().then(function(me) {
  	$scope.me = me;
  	$scope.indexes = UserService.getIndexes(me.username).$object;
  });

  // Load the modal from the given template URL
  $ionicModal.fromTemplateUrl('modal.html', function(modal) {
    $scope.modal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Be sure to cleanup the modal
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.uploadFile = function(){
      var file = $scope.myFile;
      console.log('file is ' + JSON.stringify(file));
      var uploadUrl = "http://projectw.herokuapp.com/users/v/" + 
      	$scope.me.username + "/indexes";
      fileUpload.uploadFileToUrl(file, uploadUrl);
  };

})

// A simple controller that fetches a list of data from a service
.controller('UserIndexCtrl', function($scope, UserService, $state) {
  $scope.users = UserService.getMyFollowers().$object;

  $scope.rightButtons = [
	  { 
	    type: 'button-clear-light',
	    content: '<i class="icon ion-plus-round"></i>',
	    tap: function(e) {
	    	$state.go('tab.search');
	    }
	  }
	];
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
