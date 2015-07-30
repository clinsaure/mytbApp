"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var serviceURL = "http://localhost:81/tbServer/";

var responseItem;
var angular;

angular.module('starter.signUp.services', ['ngMessages']),
angular.module('starter.signUp.services', ['ngResource'])

.factory('SignUp', function ($http, $state, $resource, $filter,$ionicPopup) {
    
$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    var signUpUser = function (signupData) {
        var appDate = $filter('date')(signupData.birthdate, "yyyy-MM-dd");
        var signUpdata = "username=" + signupData.username + 
                "&email=" + signupData.email +
                "&password=" + signupData.password +
                "&birthdate=" + appDate ;
        
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "register", signUpdata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        var alertPopup = $ionicPopup.alert({
                            title:'Register success',
                            template: 'Please login to use the App'
                        });
                        $state.go('app.signIn');
                    } else {
                        $("#signUpMsg").text(data.message).css("color", "red");
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $("#signUpMsg").text(data.message).css("color", "red");
                    console.log("AJAX failed!");
                });
    };

       
    return {
        signUpUser: signUpUser
    };
})

;
