"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var serviceURL = "http://localhost:81/tbServer/";

var responseItem;
var angular;
var alertPopup;

angular.module('starter.signIn.services', ['ngMessages']),
angular.module('starter.signIn.services', ['ngResource'])

.factory('SignIn', function ($http, $state, $ionicPopup, $window) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var signInUser = function (loginData) {
        var logindata = "email=" + loginData.email + "&password=" + loginData.password;
        // Simple POST request example (passing data) :
        if(loginData.email !== undefined || loginData.password !== undefined){
        $http.post(serviceURL + "login", logindata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
//                        if (typeof (Storage) !== "undefined") {
                            sessionStorage.username = data.username;
                            sessionStorage.apikey = data.apiKey;
//                        }
                        alertPopup = $ionicPopup.alert({
                                title:'Sign In',
                                template: data.message
                            });
                        $window.location.reload(true);    
                        $state.go('app.home');
                        
                    } else {
                        alertPopup = $ionicPopup.alert({
                                title:'Sign In',
                                template: data.message
                            });
                            sessionStorage.clear();
                        localStorage.clear();
                        $window.location.reload(true);
                        $state.go('app.signIn');
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alertPopup = $ionicPopup.alert({
                                title:'Sign In',
                                template: data.message
                            });
                            $state.go('app.signIn');
                });
            }
    };

    return {
        signInUser: signInUser
    };
})

;