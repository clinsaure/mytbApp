"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var responseItem;
var angular;
var alertPopup;

angular.module('starter.signUp.services', ['ngMessages']),
angular.module('starter.signUp.services', ['ngResource'])

.factory('SignUp', function ($http, $state, $resource, $filter,$ionicPopup, $window) {
    
$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    var signUpUser = function (signupData) {
        var appDate = $filter('date')(signupData.birthdate, "yyyy-MM-dd");
        var signUpdata = "username=" + signupData.username + 
                "&email=" + signupData.email +
                "&password=" + signupData.password +
                "&birthdate=" + appDate ;
        // Simple POST request example (passing data) :
        if(signupData.email !== undefined || appDate !== undefined || 
            signupData.username !== undefined || signupData.password !== undefined){
            $http.post(serviceURL + "register", signUpdata).
                    success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        if (data.error === false) {
                            alertPopup = $ionicPopup.alert({
                                title:'Sign Up',
                                template: 'Please login to use the App'
                            });
                            $window.location.reload(true);
                            $state.go('app.signIn');
                        } else {
                            alertPopup = $ionicPopup.alert({
                                title:'Sign Up',
                                template: data.message
                            });
                            $state.go('app.signUp');
                        }
                    }).
                    error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        //$("#signUpMsg").text(data.message).css("color", "red");
                        //console.log("AJAX failed!");
                        alertPopup = $ionicPopup.alert({
                                title:'Sign Up',
                                template: data.message
                            });
                            $state.go('app.signUp');
                    });
            }
    };

       
    return {
        signUpUser: signUpUser
    };
})

;
