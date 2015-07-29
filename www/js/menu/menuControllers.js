"use strict";
var requestToken = "";
var accessToken = "";
var clientId = "200463856698-diablkbebnhc8srvgg2vg53q8or6h95t.apps.googleusercontent.com";
var clientSecret = "xDiJAb7Yq5bUj3EI4ID2aAHF";
//var serviceURL = "http://tbapp.kamdem-kenmogne.de/";
var serviceURL = "http://localhost:81/tbServer/";
var angular;

angular.module('starter.menu.controllers', ['starter.signUp.controllers',
        'starter.article.controllers','starter.message.controllers','starter.signIn.controllers'])

.controller('AppCtrl', function($scope, $ionicModal , $state) {
    
    if(sessionStorage.getItem("username") !== null){
       $("#titelUname").text("Hallo " + sessionStorage.getItem("username")).css("color", "green");
       $scope.showpostArticle = true;
       $scope.showMail = true;
       $scope.showMyArticles = true;
       $scope.showPostArticle = true;
       $scope.showMyWishList = true;
       $scope.showPostWishList = true;
    }else{
        $("#titelUname").text("Hallo Gast").css("color", "green");
        $scope.showpostArticle = false;
        $scope.showMail = false;
        $scope.showMyArticles = false;
        $scope.showPostArticle = false;
        $scope.showMyWishList = false;
        $scope.showPostWishList = false;
    }
    
    
    $scope.articles = function(){
        $state.go('app.articles');
    };
    $scope.categorie = function(){
        $state.go('app.categories');
    };
    $scope.mytbapp = function(){
        $state.go('app.secure');
    };
    
})
//Articles
.controller('ArticlesCtrl', function($scope, $stateParams, Articles) {
    $scope.loadArticles = function() {
        Articles.all($stateParams.categorieId)
        .success(function(articles){
//       $scope.articles = articles;
        $scope.articles = [];
        for(var i = 0; i < articles.length ; i++) {
           $scope.articles.push({id: articles[i].article_Id, name: articles[i].name,
           description: articles[i].description, src: serviceURL + articles[i].image});
        }
    });
    };
    
    
  $scope.remove = function(article) {
    Articles.remove(article);
  };
  
  $scope.loadImages = function() {
      Articles.all()
      .success(function(images){
            $scope.images = [];
        for(var i = images.length -10; i < images.length; i++) {
            $scope.images.push({id: images[i].article_Id, src: serviceURL + images[i].image});
//            console.log(images[i]);
        }
      });
    };
})
;




