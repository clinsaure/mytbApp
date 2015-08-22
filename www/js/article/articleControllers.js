"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;

angular.module('starter.article.controllers', ['starter.article.services'])

//Articles
.controller('ArticlesCtrl', function($http, $scope, $stateParams, Articles) {
//    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.loadArticles = function() {
        Articles.all($stateParams.categorieId)
        .success(function(articles){
        $scope.articles = [];
        for(var i = 0; i < articles.length ; i++) {
           $scope.articles.push({id: articles[i].article_Id, name: articles[i].name,
           description: articles[i].description, date: articles[i].created_at,
           src: serviceURL + articles[i].image});
        }
    });
    };
})

//Articles
.controller('MyArticlesCtrl', function($http, $scope, $stateParams, MyArticles) {
//    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.loadMyArticles = function() {
        MyArticles.all($stateParams.categorieId)
        .success(function(articles){
        $scope.articles = [];
        for(var i = 0; i < articles.length ; i++) {
           $scope.articles.push({id: articles[i].article_Id, name: articles[i].name,
           description: articles[i].description, date: articles[i].created_at, 
           src: serviceURL + articles[i].image});
        }
    });
    };
    
    
  $scope.remove = function(articleId) {
    MyArticles.remove(articleId);
  };
  
})

.controller('ArticleCtrl', function($http, $scope,$state, $stateParams, Articles) {  

//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
//localStorage.articleId = $stateParams.articleId;
window.localStorage.articleId = $stateParams.articleId;
    var selectArticle = Articles.get($stateParams.articleId);
    $scope.article = selectArticle;
                $scope.articles = [];
        $scope.articles.push({id: selectArticle.article_Id, name: selectArticle.name,
           description: selectArticle.description, src: serviceURL + selectArticle.image,
       date: selectArticle.created_at});
       
//       $scope.artcmsg = function () {
//           console.log('log');
//        $state.go('app.artcMessage');
//    };
            
})

.controller('ArticlePostCtrl', function($http, $scope, $stateParams, ArticlePost, Categories) {  
    // Form data for the login modal
//    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.articlePostData = {};
    // Perform the login action when the user submits the login form
    $scope.doarticlePost = function (formInfo) {
        if(formInfo.$valid) {
            ArticlePost.articlePost($scope.articlePostData);
            console.log($scope.articlePostData);
        }
    };
    
    $scope.getCategories = function(){
     Categories.all()
    .success(function(categories){
       $scope.categories = categories; 
    });
    };
})

// Categories
.controller('CategoriesCtrl', function($http, $scope, Categories) {
//    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    Categories.all()
    .success(function(categories){
       $scope.categories = categories; 
    });
})

//
.controller('ArticleCatCtrl', function ($http,$scope, $stateParams, ArticlesCat) {
//    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.loadArticlesCat = function() {
        ArticlesCat.all($stateParams.categoryId)
        .success(function(articles){
//       $scope.articles = articles;
        $scope.articles = [];
        for(var i = 0; i < articles.length ; i++) {
           $scope.articles.push({id: articles[i].article_Id, name: articles[i].name,
           description: articles[i].description, src: serviceURL + articles[i].image,
           date: articles[i].created_at});
        }
    });
    };
})
;