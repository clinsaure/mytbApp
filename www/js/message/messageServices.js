"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var serviceURL = "http://localhost:81/tbServer/";
var angular;
var responseItem;
var messagesItem;

angular.module('starter.user.services', ['ngMessages']),
angular.module('starter.message.services', ['ngResource'])

.factory('Messages', function ($http, $state, $resource, $ionicPopup) {

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
    
    var _messages = function() {

    return $http.get(serviceURL + "messages" ,{
        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
    })
        .success(function(data) {
            messagesItem = data;
         });   
};

    return {
        newMsg: newMsg,
        all: _messages,
        get: function (messageId) {
//        console.log("arrivé");
            for (var i = 0; i < messagesItem.length; i++) {
                if (messagesItem[i].messages_Id === messageId) {
                    return messagesItem[i];
                }
            }
            return null;
        }
    };
})

//.factory('Message', function ($http, $state, $resource, $filter) {
//    
//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
//$http.defaults.headers.common['Authorization'] = sessionStorage.getItem("apikey");
//  // Some fake testing data      
//var _messages = function() {
//
//    return $http.get(serviceURL + "messages" ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
//        isArray: true,
//        crossDomain : true
//    })
//        .success(function(data) {
//            messagesItem = data;
//         });   
//};
//
//  return {
//    all: _messages
//    };
//    
//  })

;

