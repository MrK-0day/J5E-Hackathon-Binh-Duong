var app = angular.module("myApp", [
    "ngRoute"
]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "app/view/NewSchedule.html",
      controller : "NewScheduleCtrl"
    })
    .when("/schedule", {
      templateUrl : "app/view/Schedule.html",
      controller : "ScheduleCtrl"
    })
    .when("/login", {
        templateUrl : "app/view/LogIn.html",
        controller : "LoginCtrl"
    })
    .when("/logon", {
        templateUrl : "app/view/LogOn.html",
        controller : "LogonCtrl"
    })
    .otherwise({redirectTo: '/'});
  });
  app.controller('MainCtrl', function($rootScope){
    $rootScope.toggled = false;
    $rootScope.url = "http://35.198.228.133:8080";
    $rootScope.isAuth = false;
    $rootScope.token = "";
  })
  app.controller('LoginCtrl', function($scope, $rootScope, $http, $window){
    $rootScope.toggled = true;
    $scope.msg = "";
    $scope.login = function(){
        var cre = {username : $scope.user, password: $scope.pass};
        $http.post($rootScope.url + '/login', cre)
        .then(
          function (response) {
              var data = response.data;
              $rootScope.token = data.token;
              if (data.code == 1) {
                  $rootScope.isAuth = true;
                  $window.location.href =  "#!/";
              }
              else $scope.msg = "Sai tai khoan hoac mat khau";
          },
          function (response) {
            scope.msg = "Loi";
          },
          function(response) {
              console.log(response)
          });
    }
  })
  app.controller('LogonCtrl', function($scope, $rootScope, $http, $window){
      $scope.msg ="";
    $scope.logon = function(){
        var cre = {name: $scope.lnam + $scope.fname, user : $scope.user, pass : $scope.pass};
        if ($scope.pass  != $scope.cpass)
            $scope.msg = "Mat khau khong khop";
        else{
            $http.post($rootScope.url + '/register', cre)
            .then(
              function (response) {
                  var data = response.data;
                  $rootScope.token = data.token;
                  if (data.code == 1) {
                      $rootScope.isAuth = true;
                      $window.location.href =  "#!/";
                  }
                  else $scope.msg = data.msg;
              },
              function (response) {
                scope.msg = "Loi";
              },
              function(response) {
                  console.log(response)
              });
        }
    }
    
  })
  app.controller('SideMenuCtrl', function($rootScope, $scope){
      $scope.toggle = function(){
          $rootScope.toggled = !$rootScope.toggled;
      }
      $scope.messages = [
          {
              title : "John",
              content : "abckhfsdjnfkjdsnfkdsnfksdnj",
              time : "12AM"
          },
          {
            title : "Brad",
            content : "abckhfsdjnfkjdsnfkdsnfksdnj",
            time : "12AM"
        }
      ]
  })
  app.controller('NewScheduleCtrl', function($scope, $rootScope, $window){
    if ($rootScope.isAuth == false){
        $window.location.href = "#!/login";
    }
  })
  app.controller('ScheduleCtrl', function($scope){
    
    })