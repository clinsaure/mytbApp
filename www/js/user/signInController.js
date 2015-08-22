"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;

angular.module('starter.signIn.controllers', ['starter.signIn.services'])

.controller('SignInCtrl', function($scope, $ionicModal, SignIn, $http, $state, $rootScope, $ionicPush) { 
    
    // Form data for the login modal
    $scope.loginData = {};
    // Perform the login action when the user submits the login form
    $scope.doLogin = function (signInForm) {
        if(signInForm.$valid){
            SignIn.signInUser($scope.loginData).then(function(){
        });
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        //    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
        }
    };

    $scope.signUp = function () {
        $state.go('app.signUp');
    };
})

;


