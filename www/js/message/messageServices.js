"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var serviceURL = "http://tbapp.kamdem-kenmogne.de/";
var serviceURL = "http://localhost:81/tbServer/";
var angular;
var responseItem;
var localStorage = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    image: null,
    name:null,
    apikey: null
};

angular.module('starter.user.services', ['ngMessages']),
angular.module('starter.message.services', ['ngResource'])

.factory('SendMsg', function ($http, $state, $resource, $ionicPopup) {

    $http.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
    $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("apikey");
    var newMsg = function (postMsgData) {
        var msgdata = "object=" + postMsgData.object + "&message=" + postMsgData.msgText ;
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "message/"+ sessionStorage.getItem("articleId"), msgdata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        var alertPopup = $ionicPopup.alert({
                            title:'Message',
                            template: data.message
                        });
                        $state.go('app.articles');
                    } else {
                       var alertPopup = $ionicPopup.alert({
                            title:'Message',
                            template: data.message
                        });
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    var alertPopup = $ionicPopup.alert({
                            title:'Message',
                            template: data.message
                        });
                });
    };

    return {
        newMsg: newMsg
    };
})

.factory('SignUp', function ($http, $state, $resource, $filter) {
    
$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
////console.log(loginData);
    var signUpUser = function (signupData) {
        console.log(signupData);
        var appDate = $filter('date')(signupData.birthdate, "yyyy-MM-dd");
        console.log(appDate);
        var signUpdata = "username=" + signupData.username + 
                "&email=" + signupData.email +
                "&password=" + signupData.password +
                "&birthdate=" + appDate ;
        
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "register", signUpdata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(data);
                    if (data.error === false) {
                        $state.go('app.login');
                        arlet("Please login to use the App");
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
});

function postLogin(url, obj){
    return $.ajax({
        type: "POST",
        url: url,
        cache: true,
        data: obj
    });
}
