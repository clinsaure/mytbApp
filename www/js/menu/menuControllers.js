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

.controller('AppCtrl', function($scope, $ionicModal, $controller,$ionicUser, 
    $state, $window, ArticlesMenu, $rootScope, $ionicPush, $ionicPlatform) {

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
$ionicPlatform.ready(function() {
//    $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
//      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
    
     $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      alert("Successfully registered token " + data.token);
  console.log('Ionic Push: Got token ', data.token, data.platform);
  $scope.token = data.token;
});

//        $state.go('app.secure');
});
    };

    
    $scope.mytest = function(){
        $ionicPush.register({
        canShowAlert: false, //Can pushes show an alert on your screen?
        canSetBadge: true, //Can pushes update app icon badges?
        canPlaySound: true, //Can notifications play a sound?
        canRunActionsOnWake: true, //Can run actions outside the app,
        onNotification: function(notification) {
          // Handle new push notifications here
          console.log(notification);
      if(notification["$state"]) {
        //prompt the user to switch
        navigator.notification.confirm("You have a new chat - go to it?", function(btn) {
          if(btn === 1) {
            $state.go(notification["$state"]);
          }
        },"New Chat!")
      }
      return true;
        }
      });
    };
    
    $scope.loadImages = function() {              
      ArticlesMenu.all()
      .success(function(images){
            $scope.images = [];
        for(var i = images.length -10; i < images.length; i++) {
            $scope.images.push({id: images[i].article_Id, src: serviceURL + images[i].image,
                    date: images[i].created_at});
        }
      });
    };
    
})


;




