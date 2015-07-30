"use strict";

var serviceURL = "http://localhost:81/tbServer/";
var angular;
var accessToken;
var requestToken;

angular.module('starter.signUp.controllers', ['starter.signUp.services'])

.controller('SignInCtrl', function($scope, $ionicModal, SignIn, $http, $state) { 
    // Form data for the login modal
    $scope.loginData = {};
console.log($scope.loginData);
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        SignIn.signInUser($scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        //    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
    };

    $scope.signUp = function () {
        $state.go('app.signUp');
    };
})

.controller('SignUpCtrl', function($scope, $ionicModal, SignUp, $http, $state) { 
    // Form data for the login modal
    $scope.signupData = {};
    $scope.loginData = {};
    // Perform the login action when the user submits the login form
    $scope.doSignup = function () {
        SignUp.signUpUser($scope.signupData);
    };
    
    $scope.doLogin = function () {
        SignUp.signInUser($scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        //    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
    };

})

.controller('LoginGoogleCtrl', function($scope, $http, $location) {
 
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
    $scope.login = function() {
        var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
        ref.addEventListener('loadstart', function(event) { 
            if((event.url).startsWith("http://localhost/callback")) {
                requestToken = (event.url).split("code=")[1];
                $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                    .success(function(data) {
                        accessToken = data.access_token;
                        $location.path("/secure");
                    })
                    .error(function(data, status) {
                        alert("ERROR: " + data);
                    });
                ref.close();
            }
        });
    };
 
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) === 0;
        };
    } 
})
 
.controller('SecureController', function($scope, $http) {
    $scope.accessToken = accessToken;   
});
