"use strict";
//var serviceURL = "http://tbapp.kamdem-kenmogne.de/";
var serviceURL = "http://localhost:81/tbServer/";
var angular;

angular.module('starter.message.controllers', ['starter.message.services'])

.controller('messageArtcCtrl', function ($scope, $ionicModal, $ionicPopup,$stateParams, SendMsg, $state) {

//    // Form data for the post Message modal
    $scope.postMsgData = {};
    
    $scope.artTomsg = function(){
        if(sessionStorage.getItem("username") !== null){
            $state.go('app.artcMessage');
        }else{
            var alertPopup = $ionicPopup.alert({
                    title:'Message',
                    template: 'Please sign In to send message'
                });
               $state.go('app.signIn');         
        }
        
    };

    $scope.doartcmessagePost = function () {
//        var alertPopup = $ionicPopup.alert({
//             title:'cool',
//            template:'please check'
//        });

        SendMsg.newMsg($scope.postMsgData);
        console.log("Article Id " + sessionStorage.getItem("articleId"));   
    };

})

;
