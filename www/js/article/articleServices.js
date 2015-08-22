"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;

var articlesItem;
var categoriesItem;
var articleCatItem;
var myArticlesItem;
var wishItem;
var responseItem;
var alertPopup;
var articleName;

//angular.module('starter.article.services', ['ngMessages'])
angular.module('starter.article.services', ['ngResource'])


.factory('Articles', function($http) {

  // Some fake testing data      
var _articles = function() {

    return $http.get(serviceURL + "articles" ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
    })
        .success(function(data) {
            articlesItem = data;
         });   
};

  return {
    all: _articles,
//    get: getArticle,
    remove: function(article) {
      articles.splice(articles.indexOf(article), 1);
    },
    
    get: function(articleId) {
      for (var i = 0; i < articlesItem.length; i++) {
        if (articlesItem[i].article_Id === articleId) {
          return articlesItem[i];
        }
      }
      return null;
    }
  };
})

.factory('MyArticles', function($http, $ionicPopup, $window, $state) {

  // Some fake testing data      
    var _myarticles = function() {

        return $http.get(serviceURL + "article" ,{
//            headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
            isArray: true,
            crossDomain : true
        }).success(function(data) {
                myArticlesItem = data;
//                console.log( data);
        }).error(function (data, status) {
        console.log(status, data);
        });  
    };
    
    var _deletarticle = function(id){
        
        $http.delete(serviceURL + "article/" + id).   
        success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
            if (data.error === false) {
                alertPopup = $ionicPopup.alert({
                    title:'Article',
                    template: data.message
                });
    //                        $state.go('app.wishlist',{}, {reload:true});
                $window.location.reload(true);

            } else {
                alertPopup = $ionicPopup.alert({
                    title:'Article',
                    template: data.message
                });
                $state.go('app.myArticles');
            }
        }).
        error(function (data, status, headers, config) {
            alertPopup = $ionicPopup.alert({
                    title:'Article',
                    template: 'Delete article failed please try again'
                });
                $state.go('app.myArticles');
        });
    };
    

  return {
    all: _myarticles,
//    get: getArticle,
    remove: _deletarticle
  };
})

.factory('Categories', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data      
var categories = function() {
    
    return $http.get(serviceURL + "categories" ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
    })
        .success(function(data) {
            categoriesItem = data;
         });   
};

  return {
    all: categories,
//    get: getArticle,
    remove: function(article) {
      categories.splice(categories.indexOf(article), 1);
    },
    
    get: function(articleId) {
      for (var i = 0; i < categoriesItem.length; i++) {
        if (categoriesItem[i].article_Id === articleId) {
          return categoriesItem[i];
        }
      }
      return null;
    }
  };
})

.factory('ArticlesCat', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data      
var articleCat = function(categorieId) {
    
    return $http.get(serviceURL + "articleCat/" + categorieId ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
    })
        .success(function(data) {
            articleCatItem = data;
         });   
};

  return {
    all: articleCat

  };
})

.factory('ArticlePost', function($http, $state, $ionicPopup, $window){
    var _articlePost = function (articlePostData) {
        articleName = articlePostData.name;
        var catId;
        angular.forEach(categoriesItem, function(value, key){
            if(value.name === articlePostData.catName){
                catId = value.categorie_Id;
            } 
        });

        var articledata = "categorie_Id=" + catId + "&name=" + articlePostData.name +
                "&description=" + articlePostData.description + "&image=" + articlePostData.image;
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "article", articledata).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                if (data.error === false) {
                    alertPopup = $ionicPopup.alert({
                            title:'Message',
                            template: data.message
                        });
//                            $window.location.reload(true);
                    $state.go('app.articles');
                    _getWish();

                } else {
                    alertPopup = $ionicPopup.alert({
                            title:'Message',
                            template: data.message
                        });
                        articleName = null;
                }
            }).error(function (data, status, headers, config) {
                alertPopup = $ionicPopup.alert({
                        title:'Message',
                        template: data.message
                    });
                    articleName = null;
            });
    };
    
    var _getWish = function(){
        return $http.get(serviceURL + "wishlists" ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
        })
        .success(function(data) {
            wishItem = data;
            console.log(data);
            angular.forEach(data, function(value, key){
            if(value.searchText === articleName){
                console.log(value.user_Id);
                _sendmsg(value.user_Id);
                } 
            });
            
        });   
    };
    
    var _sendmsg = function(user_Id){
        var msgdata = "message= das konnten Sie interessiert" ;
        $http.post(serviceURL + "messagepush/"+ user_Id, msgdata).
            success(function (data, status, headers, config) {
                if (data.error === false) {
                    $state.go('app.articles');
                } 
            });

    };

    return {
        articlePost: _articlePost
    };
})
;
