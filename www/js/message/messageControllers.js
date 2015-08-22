"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;

angular.module('starter.message.controllers', ['starter.message.services'])

//Messages
.controller('MessagesCtrl', function($http, $scope, Messages) {
//    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    
    $scope.loadMessages = function() {
        Messages.all()
        .success(function(messages){
//       $scope.articles = articles;
        $scope.messages = [];
        for(var i = 0; i < messages.length ; i++) {
           $scope.articles.push({id: articles[i].article_Id, name: articles[i].name,
           description: articles[i].description, src: serviceURL + articles[i].image});
        }
    });
    };
    
})

.controller('messagesCtrl', function ($scope, $http, $ionicPopup,$stateParams, $log, Messages, $state) {

//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

//    // Form data for the post Message modal
    $scope.postMsgData = {};
    
    $scope.artTomsg = function(){
        if(window.localStorage.getItem("username") !== null){
            $state.go('app.artcMessage');
        }else{
            var alertPopup = $ionicPopup.alert({
                    title:'Message',
                    template: 'Please sign In to send message'
                });
               $state.go('app.signIn');         
        }
    };

    $scope.doartcmessagePost = function (sendmsg) {
        if(sendmsg.$valid) {
            Messages.newMsg($scope.postMsgData);
        }
    };
    
    $scope.loadMessages = function() {
        Messages.all()
        .success(function(messages){
//       $scope.articles = articles;
        $scope.messages = [];
        for(var i = 0; i < messages.length ; i++) {
           $scope.messages.push({id: messages[i].messages_Id, object: messages[i].object,
           sender: messages[i].sender, receiver: messages[i].receiver,
           message: messages[i].message, date: messages[i].sendDate});
        }
    });
    };
    
    this.myMsg = function () {
        $log.debug("messagesCtrl - loadMessages");
    };

})

.controller('messageCtrl', function($http, $scope,$state, $stateParams, Messages) {  

//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

//sessionStorage.articleId = $stateParams.articleId;
    var selectMessage = Messages.get($stateParams.messageId);
    $scope.message = selectMessage;
                $scope.messages = [];
        $scope.messages.push({id: selectMessage.messages_Id, object: selectMessage.object,
           sender: selectMessage.sender, receiver: selectMessage.receiver,
           message: selectMessage.message, date: selectMessage.sendDate});
            
})

;
