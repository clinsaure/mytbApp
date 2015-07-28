/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
//var serviceURL = "http://tbapp.kamdem-kenmogne.de/";
var serviceURL = "http://localhost:81/tbServer/";
var angular;
angular.module('starter.signIn.controllers', ['starter.signIn.services'])

.controller('SignInCtrl', function($scope, $ionicModal, SignIn, $http, $state) { 
    // Form data for the login modal
    $scope.loginData = {};
//console.log($scope.loginData);
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

;


