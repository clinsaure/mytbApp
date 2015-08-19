"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var angular;

angular.module('starter.menu.controllers', ['starter.signUp.controllers',
        'starter.article.controllers','starter.message.controllers',
        'starter.signIn.controllers','starter.wishlist.controllers'])

.controller('AppCtrl', function($scope, $ionicModal, $controller, 
    $state, $window, ArticlesMenu, $rootScope, $ionicPush) {

//    $scope.loadUserData = function () {
        if (window.localStorage.getItem("username") !== null) {            
            $("#titelUname").text("Hallo " + window.localStorage.getItem("username")).css("color", "green");
            $("#msgCount").text(window.localStorage.getItem("mymsg"));
            $scope.showpostArticle = true;
            $scope.showMail = true;
            $scope.showMyArticles = true;
            $scope.showPostArticle = true;
            $scope.showMyWishList = true;
            $scope.showPostWishList = true;
            $scope.showLogin = false;
            $scope.showLogon = true;
        } else {
            $("#titelUname").text("Hallo Gast").css("color", "green");
            $scope.showpostArticle = false;
            $scope.showMail = false;
            $scope.showMyArticles = false;
            $scope.showPostArticle = false;
            $scope.showMyWishList = false;
            $scope.showPostWishList = false;
            $scope.showLogin = true;
            $scope.showLogon = false;
        }
//    };

    $rootScope.$on('$cordovaPush:notificationReceived', function (event, data) {
        alert('Success: ' + data.token);
        console.log('Got token: ' , data.token, data.platform);
        $scope.token = data.token;
      });
      
        $scope.doLogin = function(){
            $ionicPush.register({
                canShwoAlert: true,
                caSetBadge:true,
                canPlaySound: true,
                canRunActionsOnWake: true,
                onNotification: function(notification){
                 //handle your stuff
                 return true;
                }
            });
        } 

    $scope.logout = function(){
        window.localStorage.clear();
        $window.location.reload(true);
        $state.go('app.home'); 
    };
    
    $scope.articles = function(){
        $state.go('app.articles');
    };
    $scope.categorie = function(){
        $state.go('app.categories');
    };
    $scope.mytbapp = function(){
        $state.go('app.secure');
    };
    
    $scope.loadImages = function() {              
      ArticlesMenu.all()
      .success(function(images){
            $scope.images = [];
        for(var i = images.length -10; i < images.length; i++) {
            $scope.images.push({id: images[i].article_Id, src: serviceURL + images[i].image});
        }
      });
    };
    
})


;




