/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var serviceURL = "http://localhost:81/tbServer/";

var responseItem;
var angular;

angular.module('starter.signIn.services', ['ngMessages']),
angular.module('starter.signIn.services', ['ngResource'])

.factory('SignIn', function ($http, $state) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var signInUser = function (loginData) {
        var logindata = "email=" + loginData.email + "&password=" + loginData.password;
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "login", logindata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        if (typeof (Storage) !== "undefined") {
                            sessionStorage.username = data.username;
                            sessionStorage.apikey = data.apiKey;
                        }
                        $state.go('app.home');
                    } else {
                        localStorage.clear();
                        $("#loginMsg").text(data.message).css("color", "red");
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $("#loginMsg").text(data.message).css("color", "red");
                    console.log("AJAX failed!");
                });
    };

    return {
        signInUser: signInUser
    };
})

;