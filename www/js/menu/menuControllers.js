"use strict";

//var serviceURL = "http://tbapp.kamdem-kenmogne.de/";
var serviceURL = "http://localhost:81/tbServer/";
var angular;

angular.module('starter.menu.controllers', ['starter.signUp.controllers',
        'starter.article.controllers','starter.message.controllers',
        'starter.signIn.controllers','starter.wishlist.controllers'])

.controller('AppCtrl', function($scope, $ionicModal , $state, ArticlesMenu) {
    
//    $scope.loadUserData = function () {
        if (sessionStorage.getItem("username") !== null) {
            $("#titelUname").text("Hallo " + sessionStorage.getItem("username")).css("color", "green");
            $scope.showpostArticle = true;
            $scope.showMail = true;
            $scope.showMyArticles = true;
            $scope.showPostArticle = true;
            $scope.showMyWishList = true;
            $scope.showPostWishList = true;
        } else {
            $("#titelUname").text("Hallo Gast").css("color", "green");
            $scope.showpostArticle = false;
            $scope.showMail = false;
            $scope.showMyArticles = false;
            $scope.showPostArticle = false;
            $scope.showMyWishList = false;
            $scope.showPostWishList = false;
        }
//    };
    
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




